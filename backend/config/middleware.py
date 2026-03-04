"""Middleware for config app."""


class ApiCsrfExemptMiddleware:
    """
    Exempt /api/ routes from CSRF validation.

    JWT-based API auth does not rely on cookies for credential transmission
    (the JWT cookie is httpOnly and sent automatically). CSRF protection is
    less critical here, and cross-origin requests (e.g. SPA at :5173 to
    API at :8000) cannot read the CSRF cookie anyway due to same-origin policy.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith("/api/"):
            request._dont_enforce_csrf_checks = True
        return self.get_response(request)
