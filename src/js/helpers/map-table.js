/**
 * @function maps component to use based on option name
 * @param {string} item
 *
 * @return {string} component name
 */
export function getComponentMap(item) {
    switch (item) {
        case 'classic_subs':
        case 'premium_subs':
        case 'low_fat_subs':
            return 'Subs'

        case 'breakfast_subs_and_drink':
            return 'Breakfast'

        case 'sides_and_kids_pak':
            return 'Sides'

        case 'drinks_and_salad':
            return 'Drinks'

        case 'drinks_am':
            return 'DrinksAM'

        case 'sub_and_drink_deal':
            return 'SubDrinks'

        case 'add_a_drink':
            return 'AddDrink'

        case 'half_bacon':
            return 'HalfBacon'

        case 'sides_am':
            return 'SidesAM'

        default:
            return `Error: Cannot Map Component, ${item}`
    }
}

//TODO: document
export function getTitleName(str) {
    switch (str) {
        case 'Premium Subs':
        case 'Classic Subs':
        case 'Low Fat Subs':
        case 'Breakfast':
        case 'Sub and Drink Deal':
            return 'subTitle'

        case 'Cold Drinks':
            return 'coldDrinkTitle'
        case 'Hot Drinks':
            return 'hotDrinkTitle'
        case 'Make It a Salad':
            return 'saladTitle'

        case 'Sides, Snacks and Treats':
            return 'sidesTitle'
        case 'Kids Pak':
            return 'kidsTitle'
        case 'Add Bacon':
            return 'baconTitle'

        default:
            return ''
    }
}

// TODO: document
export function getCsvMap(str) {

    let
        find = str.toLowerCase().replace(/ /g, '').replace('.zip', ''),
        list = {
            'breakfastsubsanddrink' : ['UK - Menu - Breakfast Subs.csv', 'Breakfast Title', 'UK - Add Drink Bug', 'UK Breakfast Served Until Option'],
            'classicsubs'           : ['UK - Menu - Classic Subs', 'Classic Subs Market Selection', 'Classic Subs Title', 'UK - Add Drink Bug'],
            'drinksandsalad'        : ['UK - Menu - Drinks.csv', 'Drinks and Salad Title', 'UK - Add Bacon'],
            'drinksam'              : ['UK - Menu - Drinks.csv', 'Drinks AM Title', 'UK - Add Bacon'],
            'lowfatsubs'            : ['UK - Menu - Low Fat Subs.csv', 'Low Fat Subs Market Selection', 'Low Fat Subs Title', 'UK - Add Drink Bug'],
            'premiumsubs'           : ['UK - Menu - Premium Subs.csv', 'Premium Subs Market Selection', 'Premium Subs Title'],
            'sidesandkidspak'       : ['UK - Menu - Sides Snacks', 'Sides Snacks and Treats Title'],
            'subanddrinkdeal'       : ['UK - Menu - Sub and Drink Deal', 'Sub and Drink Deal Title'],
            'addadrink'             : ['UK - Add Drink Bug'],
            'addbacon'              : ['UK - Add Bacon'],
            'sidesam'               : ['UK - Menu - Sides Snacks', 'Sides Snacks and Treats Title', 'UK - Add Bacon'],
        }

    return list[find] || ''
}