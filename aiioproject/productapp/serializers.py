from rest_framework import serializers
from .models import Product, SubCategory, SubProduct, SelectedProduct

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'

    def get_subproducts(self, obj):
        return SubProductSerializer(obj.subproducts.all(), many=True).data
 
class SubProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubProduct
        fields = '__all__'

class SelectedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SelectedProduct
        fields = '__all__'