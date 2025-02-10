export const registerFormControls = [
    {
        name: 'userName',
        Label: 'User Name',
        placeholder: 'Enter your user name',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'email',
        Label: 'Email',
        placeholder: 'Enter your Email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        Label: 'Password',
        placeholder: 'Enter your Password',
        componentType: 'input',
        type: 'password',
    }
]

export const loginFormControls = [

    {
        name: 'email',
        Label: 'Email',
        placeholder: 'Enter your Email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        Label: 'Password',
        placeholder: 'Enter your Password',
        componentType: 'input',
        type: 'password',
    }
]


export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title",
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter product description",
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "accessories", label: "Accessories" },
            { id: "footwear", label: "Footwear" },
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma" },
            { id: "levi", label: "Levi's" },
            { id: "zara", label: "Zara" },
            { id: "h&m", label: "H&M" },
        ],
    },
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Enter product price",
    },
    {
        label: "Sale Price",
        name: "SalePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter sale price (optional)",
    },
    {
        label: "Total Stock",
        name: "TotalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter total stock",
    },
];