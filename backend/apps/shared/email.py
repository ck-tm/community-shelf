import logging

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

import premailer

logger = logging.getLogger(__name__)


def send_html_email(subject, template_name, context, recipient_list, from_email=None):
    """Render an HTML email template, inline CSS via premailer, and send."""
    if not recipient_list:
        return

    html_raw = render_to_string(template_name, context)
    html = premailer.transform(
        html_raw,
        keep_style_tags=False,
        cssutils_logging_level=logging.CRITICAL,
    )
    text = strip_tags(html_raw)

    msg = EmailMultiAlternatives(
        subject=subject,
        body=text,
        from_email=from_email or settings.DEFAULT_FROM_EMAIL,
        to=recipient_list,
    )
    msg.attach_alternative(html, "text/html")
    msg.send(fail_silently=True)
