from rest_framework import viewsets
from .models import Product, SubCategory, SubProduct, SelectedProduct
from .serializers import ProductSerializer, SubCategorySerializer, SubProductSerializer, SelectedProductSerializer

# Create your views here.
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class SubCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

class SubProductViewSet(viewsets.ModelViewSet):
    queryset = SubProduct.objects.all()
    serializer_class = SubProductSerializer

class SelectedProductViewSet(viewsets.ModelViewSet):
    queryset = SelectedProduct.objects.all()
    serializer_class = SelectedProductSerializer