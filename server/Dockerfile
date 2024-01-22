# server/Dockerfile
FROM php:8.1-apache

WORKDIR /app
COPY ./server/composer.json ./server/composer.lock ./
RUN composer install --no-scripts --no-autoloader \
    && docker-php-ext-install pdo_mysql
COPY ./server .
RUN composer dump-autoload --optimize

# Laravelの設定ファイルをコピーするなどの追加のセットアップを行う
# ...

CMD php artisan serve --host=0.0.0.0 --port=8000
EXPOSE 8000
