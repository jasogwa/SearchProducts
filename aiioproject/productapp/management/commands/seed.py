import json
import os
from pathlib import Path
from django.core.management.base import BaseCommand
from productapp.models import Product, SubCategory, SubProduct

class Command(BaseCommand):
    help = 'Initial database seed'

    def handle(self, *args, **kwargs):
        base_dir = Path(__file__).resolve().parent.parent.parent.parent
        data_dir = base_dir / 'productapp' / 'data'

        with open(os.path.join(data_dir, 'products.json')) as f:
            products = json.load(f)['products']

        with open(os.path.join(data_dir, 'subcategories.json')) as f:
            subcatergories = json.load(f)['subcatergories']

        with open(os.path.join(data_dir, 'subproducts.json')) as f:
            subproducts = json.load(f)['subproducts']

        Product.objects.all().delete()
        SubCategory.objects.all().delete()
        SubProduct.objects.all().delete()

        for product in products:
            Product.objects.create(
                productId=product['productId'],
                productName=product['productName']
            )
        
        for subcategory in subcatergories:
            SubCategory.objects.create(
                subCategoryId=subcategory['subCategoryId'],
                product_id=subcategory['productId'],
                subCategoryName=subcategory['subCategoryName']
            )

        for subproduct in subproducts:
            SubProduct.objects.create(
                subProductId=subproduct['subProductId'],
                subCategory_id=subproduct['subCategoryId'],
                subProductName=subproduct['subProductName']
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database'))