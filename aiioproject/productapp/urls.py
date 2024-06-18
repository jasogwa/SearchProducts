from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, SubCategoryViewSet, SubProductViewSet,SelectedProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'subcategories', SubCategoryViewSet)
router.register(r'subproducts', SubProductViewSet)
router.register(r'selectedproducts', SelectedProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]