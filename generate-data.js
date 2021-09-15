const faker = require("faker");
const fs = require("fs");

faker.locale = "vi";

const randomCategoryList = (n) => {
    if (n <= 0) return [];

    const categoryList = [];

    // loop and push category

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createAt: Date.now(),
            updateAt: Date.now(),
        };

        categoryList.push(category);
    });

    return categoryList;
};

const randomProductList = (categoryList, numberOfProduct) => {
    if (numberOfProduct <= 0) return [];

    const productList = [];

    // random data
    for (const category of categoryList) {
        Array.from(new Array(numberOfProduct)).forEach(() => {
            const products = {
                categoryId: category.id,
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createAt: Date.now(),
                updateAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl(400, 400),
            };

            productList.push(products);
        });
    }

    return productList;
};

// IFFE
(() => {
    // random data
    const categoryList = randomCategoryList(4);
    const productList = randomProductList(categoryList, 5);

    // prepare db object
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Po",
        },
    };

    // write db object to db.json
    fs.writeFile("db.json", JSON.stringify(db), () => {
        console.log("Success");
    });
})();
