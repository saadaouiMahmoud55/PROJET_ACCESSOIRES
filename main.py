from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="Projet Accessoires",
    description="API de gestion d'accessoires téléphoniques",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Brand(BaseModel):
    id: int
    name: str

class Category(BaseModel):
    id: int
    name: str

class Accessory(BaseModel):
    id: int
    name: str
    price: float
    stock: int
    type: str
    brand: Brand
    category: Category

brands = [
    Brand(id=1, name="Samsung"),
    Brand(id=2, name="Apple"),
    Brand(id=3, name="Xiaomi"),
]

categories = [
    Category(id=1, name="Coque"),
    Category(id=2, name="Chargeur"),
    Category(id=3, name="Audio"),
]

accessories = [
    Accessory(
        id=1,
        name="Coque silicone Galaxy S23",
        price=14.99,
        stock=35,
        type="Protection",
        brand=brands[0],
        category=categories[0],
    ),
    Accessory(
        id=2,
        name="Chargeur sans fil iPhone",
        price=29.99,
        stock=20,
        type="Chargeur",
        brand=brands[1],
        category=categories[1],
    ),
    Accessory(
        id=3,
        name="Casque Bluetooth",
        price=49.99,
        stock=15,
        type="Audio",
        brand=brands[2],
        category=categories[2],
    ),
]

@app.get("/", tags=["Info"])
def read_root():
    return {
        "message": "API Accessoires Téléphoniques",
        "endpoints": [
            "/api/accessories",
            "/api/brands",
            "/api/categories",
        ],
    }

@app.get("/api/accessories", response_model=List[Accessory], tags=["Accessories"])
def get_accessories():
    return accessories

@app.get("/api/accessories/{accessory_id}", response_model=Accessory, tags=["Accessories"])
def get_accessory(accessory_id: int):
    for accessory in accessories:
        if accessory.id == accessory_id:
            return accessory
    raise HTTPException(status_code=404, detail="Accessoire introuvable")

@app.post("/api/accessories", response_model=Accessory, tags=["Accessories"])
def create_accessory(accessory: Accessory):
    if any(a.id == accessory.id for a in accessories):
        raise HTTPException(status_code=400, detail="ID déjà utilisé")
    accessories.append(accessory)
    return accessory

@app.put("/api/accessories/{accessory_id}", response_model=Accessory, tags=["Accessories"])
def update_accessory(accessory_id: int, accessory: Accessory):
    for index, existing in enumerate(accessories):
        if existing.id == accessory_id:
            accessories[index] = accessory
            return accessory
    raise HTTPException(status_code=404, detail="Accessoire introuvable")

@app.delete("/api/accessories/{accessory_id}", tags=["Accessories"])
def delete_accessory(accessory_id: int):
    for index, existing in enumerate(accessories):
        if existing.id == accessory_id:
            accessories.pop(index)
            return {"detail": "Accessoire supprimé"}
    raise HTTPException(status_code=404, detail="Accessoire introuvable")

@app.get("/api/brands", response_model=List[Brand], tags=["Brands"])
def get_brands():
    return brands

@app.get("/api/brands/{brand_id}", response_model=Brand, tags=["Brands"])
def get_brand(brand_id: int):
    for brand in brands:
        if brand.id == brand_id:
            return brand
    raise HTTPException(status_code=404, detail="Marque introuvable")

@app.get("/api/categories", response_model=List[Category], tags=["Categories"])
def get_categories():
    return categories

@app.get("/api/categories/{category_id}", response_model=Category, tags=["Categories"])
def get_category(category_id: int):
    for category in categories:
        if category.id == category_id:
            return category
    raise HTTPException(status_code=404, detail="Catégorie introuvable")
