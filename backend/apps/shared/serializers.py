import uuid

from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user profile — used by dj-rest-auth USER_DETAILS_SERIALIZER."""

    class Meta:
        model = CustomUser
        fields = (
            "pk",
            "email",
            "username",
            "first_name",
            "last_name",
            "phone",
            "address",
        )
        read_only_fields = ("pk", "email", "username")


class CustomRegisterSerializer(RegisterSerializer):
    """Registration with email only — auto-generates username."""

    username = serializers.HiddenField(default="")

    def validate_username(self, username):
        # Auto-generate a username from the email
        return ""

    def save(self, request):
        self.validated_data["username"] = (
            self.validated_data["email"].split("@")[0]
            + "_"
            + uuid.uuid4().hex[:6]
        )
        return super().save(request)
