# Use the official PostgreSQL image as the base
FROM postgres

# Set environment variables for PostgreSQL
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB rutina-dev


# Create a directory for data persistence
VOLUME /var/lib/postgresql/data

# Expose the default PostgreSQL port
EXPOSE 5432

# Copy any custom scripts or initialization files (optional)
# COPY init.sql /docker-entrypoint-initdb.d/