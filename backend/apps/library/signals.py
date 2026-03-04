# Signals for the library app.
#
# NOTE: Default SiteConfig creation for new tenants is handled in
# Tenant.save() → _create_default_data(), NOT via a post_save signal.
#
# A post_save signal on Tenant fires BEFORE create_schema() runs,
# meaning the tenant schema doesn't exist yet — any query against
# tenant-only tables poisons the PostgreSQL transaction and causes
# "current transaction is aborted" errors.
