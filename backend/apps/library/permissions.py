from rest_framework.permissions import BasePermission

from .models import TenantMembership


class IsTenantAdmin(BasePermission):
    """Checks that the user has admin role in the current tenant."""

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return TenantMembership.objects.filter(
            user=request.user,
            role=TenantMembership.Role.ADMIN,
        ).exists()


class IsTenantMember(BasePermission):
    """Checks that the user is a member of the current tenant."""

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return TenantMembership.objects.filter(user=request.user).exists()
