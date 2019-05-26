## Môi trường cài đặt
Linux 18.04 trở lên

## Package cần có
* yarn 1.15.2

## Cài đặt yarn
Nếu chưa có `yarn`, cài đặt bằng cách chạy lần lượt các lệnh sau trên Terminal
```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
```

## Tải các package phụ thuộc
Chỉ thực hiện một lần duy nhất.

Trong thư mục của dự án, chạy lệnh
```bash
yarn install
```

## Chạy hệ thống
Trong thư mục của dự án, chạy lệnh
```bash
yarn start
```

=======
# RecommendationWebApp
