const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './node_modules/@variantjs/**/*.ts',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/**/*.ts',
        './resources/**/*.vue',
    ],

    corePlugins: {
        preflight: false,
    },

    darkMode: 'media',
    prefix: 'tw-',

    plugins: [require('@tailwindcss/forms')],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    variants: {
        extend: {
            opacity: ['disabled'],
            cursor: ['disabled'],
        },
    },
};
