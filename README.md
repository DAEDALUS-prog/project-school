# Questions test
Проект для школьников
____
## Перед начало любых работ
Установить зависимости
```bash
> npm install
```
____

## Для запуска в разработке

```bash
> npm run start-dev
```
>
> Запустит сборку с отслеживанием изменений и перекомпиляцией
>
> В фоне должен запуститься web-server
>
> Вот тут http://localhost:8080
>
___

## Для запуска в режиме electron

```bash
> npm run start-electron
```
>
> Должны быть собраны исходники
>

## Для сборки в режиме dev
```bash
> npm run build-dev
```

## Для финальной сборки
```bash
> npm run build
```

## Далее описывается сборка приложения под разные платформы


### Windows
Обязательно перед всякими разными штуками собрать windows-build-tools. Для этого в Powershell от имени администратора надо прописать
```bash
> npm i -g windows-build-tools
```

Далее надо сделать сборку проекта
```bash
> npm run build
> npm run build-windows
```

После этого в папочке build будет лежать заветный exe файлик