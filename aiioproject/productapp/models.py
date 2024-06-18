from django.db import models

# Create your models here.
class Product(models.Model):
    productId = models.AutoField(primary_key=True)
    productName = models.CharField(max_length=100)

    def __str__(self):
        return self.productName

class SubCategory(models.Model):
    subCategoryId = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, related_name='subcategories', on_delete=models.CASCADE)
    subCategoryName = models.CharField(max_length=100)

    def __str__(self):
        return self.subCategoryName
    
class SubProduct(models.Model):
    subProductId = models.AutoField(primary_key=True)
    subCategory = models.ForeignKey(SubCategory, related_name='subproducts', on_delete=models.CASCADE)
    subProductName = models.CharField(max_length=100)

    def __str__(self):
        return self.subProductName
    
class SelectedProduct(models.Model): 
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    subproduct = models.ForeignKey(SubProduct, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)