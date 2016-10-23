'use strict';

const iPhoneModels = [
{p:"AT&T",c:"Black",g:128,m:"52"},
{p:"AT&T",c:"Silver",g:128,m:"53"},
{p:"AT&T",c:"Gold",g:128,m:"55"},
{p:"AT&T",c:"Rose Gold",g:128,m:"56"},
{p:"AT&T",c:"Jet Black",g:128,m:"57"},
{p:"AT&T",c:"Black",g:256,m:"59"},
{p:"AT&T",c:"Silver",g:256,m:"5C"},
{p:"AT&T",c:"Gold",g:256,m:"5D"},
{p:"AT&T",c:"Rose Gold",g:256,m:"5E"},
{p:"AT&T",c:"Jet Black",g:256,m:"5F"},
{p:"T-Mobile",c:"Black",g:128,m:"5G"},
{p:"T-Mobile",c:"Silver",g:128,m:"5H"},
{p:"T-Mobile",c:"Gold",g:128,m:"5J"},
{p:"T-Mobile",c:"Rose Gold",g:128,m:"5K"},
{p:"T-Mobile",c:"Jet Black",g:128,m:"5L"},
{p:"T-Mobile",c:"Black",g:256,m:"5M"},
{p:"T-Mobile",c:"Silver",g:256,m:"5N"},
{p:"T-Mobile",c:"Gold",g:256,m:"5P"},
{p:"T-Mobile",c:"Rose Gold",g:256,m:"5Q"},
{p:"T-Mobile",c:"Jet Black",g:256,m:"5R"},
{p:"Verizon",c:"Black",g:128,m:"5T"},
{p:"Verizon",c:"Silver",g:128,m:"5U"},
{p:"Verizon",c:"Gold",g:128,m:"5V"},
{p:"Verizon",c:"Rose Gold",g:128,m:"5W"},
{p:"Verizon",c:"Jet Black",g:128,m:"5X"},
{p:"Verizon",c:"Black",g:256,m:"5Y"},
{p:"Verizon",c:"Silver",g:256,m:"60"},
{p:"Verizon",c:"Gold",g:256,m:"61"},
{p:"Verizon",c:"Rose Gold",g:256,m:"62"},
{p:"Verizon",c:"Jet Black",g:256,m:"63"},
{p:"Sprint",c:"Black",g:128,m:"64"},
{p:"Sprint",c:"Silver",g:128,m:"65"},
{p:"Sprint",c:"Gold",g:128,m:"66"},
{p:"Sprint",c:"Rose Gold",g:128,m:"67"},
{p:"Sprint",c:"Jet Black",g:128,m:"68"},
{p:"Sprint",c:"Black",g:256,m:"69"},
{p:"Sprint",c:"Silver",g:256,m:"6A"},
{p:"Sprint",c:"Gold",g:256,m:"6C"},
{p:"Sprint",c:"Rose Gold",g:256,m:"6D"},
{p:"Sprint",c:"Jet Black",g:256,m:"6E"},
{p:"AT&T",c:"Black",g:32,m:"QR"},
{p:"AT&T",c:"Silver",g:32,m:"QT"},
{p:"AT&T",c:"Gold",g:32,m:"QU"},
{p:"AT&T",c:"Rose Gold",g:32,m:"QV"},
{p:"T-Mobile",c:"Black",g:32,m:"QW"},
{p:"T-Mobile",c:"Silver",g:32,m:"QX"},
{p:"T-Mobile",c:"Gold",g:32,m:"QY"},
{p:"T-Mobile",c:"Rose Gold",g:32,m:"R0"},
{p:"Verizon",c:"Black",g:32,m:"R1"},
{p:"Verizon",c:"Silver",g:32,m:"R2"},
{p:"Verizon",c:"Gold",g:32,m:"R3"},
{p:"Verizon",c:"Rose Gold",g:32,m:"R4"},
{p:"Sprint",c:"Black",g:32,m:"R5"},
{p:"Sprint",c:"Silver",g:32,m:"R6"},
{p:"Sprint",c:"Gold",g:32,m:"R7"},
{p:"Sprint",c:"Rose Gold",g:32,m:"R8" },
];

var models = {
    "MN8X2B/A": "UK iPhone 7 32GB Black",
    "MN8Y2B/A": "UK iPhone 7 32GB Silver",
    "MN902B/A": "UK iPhone 7 32GB Gold",
    "MN912B/A": "UK iPhone 7 32GB Rose Gold",
    "MN922B/A": "UK iPhone 7 128GB Black",
    "MN932B/A": "UK iPhone 7 128GB Silver",
    "MN942B/A": "UK iPhone 7 128GB Gold",
    "MN952B/A": "UK iPhone 7 128GB Rose Gold",
    "MN962B/A": "UK iPhone 7 128GB Jet Black",
    "MN972B/A": "UK iPhone 7 256GB Black",
    "MN982B/A": "UK iPhone 7 256GB Silver",
    "MN992B/A": "UK iPhone 7 256GB Gold",
    "MN9A2B/A": "UK iPhone 7 256GB Rose Gold",
    "MN9C2B/A": "UK iPhone 7 256GB Jet Black",
    "MN4M2B/A": "UK iPhone 7 Plus 128GB Black",
    "MN4P2B/A": "UK iPhone 7 Plus 128GB Silver",
    "MN4Q2B/A": "UK iPhone 7 Plus 128GB Gold",
    "MN4U2B/A": "UK iPhone 7 Plus 128GB Rose Gold",
    "MN4V2B/A": "UK iPhone 7 Plus 128GB Jet Black",
    "MN4W2B/A": "UK iPhone 7 Plus 256GB Black",
    "MN4X2B/A": "UK iPhone 7 Plus 256GB Silver",
    "MN4Y2B/A": "UK iPhone 7 Plus 256GB Gold",
    "MN502B/A": "UK iPhone 7 Plus 256GB Rose Gold",
    "MN512B/A": "UK iPhone 7 Plus 256GB Jet Black",
    "MNQM2B/A": "UK iPhone 7 Plus 32GB Black",
    "MNQN2B/A": "UK iPhone 7 Plus 32GB Silver",
    "MNQP2B/A": "UK iPhone 7 Plus 32GB Gold",
    "MNQQ2B/A": "UK iPhone 7 Plus 32GB Rose Gold",

    "MN9D2LL/A" : "US iPhone 7 32GB Black (AT&T GSM)",
    "MN9E2LL/A" : "US iPhone 7 32GB Silver (AT&T GSM)",
    "MN9F2LL/A" : "US iPhone 7 32GB Gold (AT&T GSM)",
    "MN9G2LL/A" : "US iPhone 7 32GB Rose Gold (AT&T GSM)",
    "MN9H2LL/A" : "US iPhone 7 128GB Black (AT&T GSM)",
    "MN9J2LL/A" : "US iPhone 7 128GB Silver (AT&T GSM)",
    "MN9K2LL/A" : "US iPhone 7 128GB Gold (AT&T GSM)",
    "MN9L2LL/A" : "US iPhone 7 128GB Rose Gold (AT&T GSM)",
    "MN9M2LL/A" : "US iPhone 7 128GB Jet Black (AT&T GSM)",
    "MN9N2LL/A" : "US iPhone 7 256GB Black (AT&T GSM)",
    "MN9P2LL/A" : "US iPhone 7 256GB Silver (AT&T GSM)",
    "MN9Q2LL/A" : "US iPhone 7 256GB Gold (AT&T GSM)",
    "MN9R2LL/A" : "US iPhone 7 256GB Rose Gold (AT&T GSM)",
    "MN9T2LL/A" : "US iPhone 7 256GB Jet Black (AT&T GSM)",
    "MN9U2LL/A" : "US iPhone 7 32GB Black (T-Mobile GSM)",
    "MN9V2LL/A" : "US iPhone 7 32GB Silver (T-Mobile GSM)",
    "MN9W2LL/A" : "US iPhone 7 32GB Gold (T-Mobile GSM)",
    "MN9X2LL/A" : "US iPhone 7 32GB Rose Gold (T-Mobile GSM)",
    "MN9Y2LL/A" : "US iPhone 7 128GB Black (T-Mobile GSM)",
    "MNA02LL/A" : "US iPhone 7 128GB Silver (T-Mobile GSM)",
    "MNA32LL/A" : "US iPhone 7 128GB Gold (T-Mobile GSM)",
    "MNA42LL/A" : "US iPhone 7 128GB Rose Gold (T-Mobile GSM)",
    "MNA52LL/A" : "US iPhone 7 128GB Jet Black (T-Mobile GSM)",
    "MNA62LL/A" : "US iPhone 7 256GB Black (T-Mobile GSM)",
    "MNA72LL/A" : "US iPhone 7 256GB Silver (T-Mobile GSM)",
    "MNA82LL/A" : "US iPhone 7 256GB Gold (T-Mobile GSM)",
    "MNA92LL/A" : "US iPhone 7 256GB Rose Gold (T-Mobile GSM)",
    "MNAA2LL/A" : "US iPhone 7 256GB Jet Black (T-Mobile GSM)",
    "MNAC2LL/A" : "US iPhone 7 32GB Black (Verizon)",
    "MNAD2LL/A" : "US iPhone 7 32GB Silver (Verizon)",
    "MNAE2LL/A" : "US iPhone 7 32GB Gold (Verizon)",
    "MNAF2LL/A" : "US iPhone 7 32GB Rose Gold (Verizon)",
    "MNAJ2LL/A" : "US iPhone 7 128GB Black (Verizon)",
    "MNAK2LL/A" : "US iPhone 7 128GB Silver (Verizon)",
    "MNAL2LL/A" : "US iPhone 7 128GB Gold (Verizon)",
    "MNAM2LL/A" : "US iPhone 7 128GB Rose Gold (Verizon)",
    "MNAP2LL/A" : "US iPhone 7 128GB Jet Black (Verizon)",
    "MNAQ2LL/A" : "US iPhone 7 256GB Black (Verizon)",
    "MNAU2LL/A" : "US iPhone 7 256GB Silver (Verizon)",
    "MNAV2LL/A" : "US iPhone 7 256GB Gold (Verizon)",
    "MNAW2LL/A" : "US iPhone 7 256GB Rose Gold (Verizon)",
    "MNAX2LL/A" : "US iPhone 7 256GB Jet Black (Verizon)",
    "MNAY2LL/A" : "US iPhone 7 32GB Black (Sprint)",
    "MNC02LL/A" : "US iPhone 7 32GB Silver (Sprint)",
    "MNC12LL/A" : "US iPhone 7 32GB Gold (Sprint)",
    "MNC22LL/A" : "US iPhone 7 32GB Rose Gold (Sprint)",
    "MNC32LL/A" : "US iPhone 7 128GB Black (Sprint)",
    "MNC42LL/A" : "US iPhone 7 128GB Silver (Sprint)",
    "MNC52LL/A" : "US iPhone 7 128GB Gold (Sprint)",
    "MNC62LL/A" : "US iPhone 7 128GB Rose Gold (Sprint)",
    "MNC72LL/A" : "US iPhone 7 128GB Jet Black (Sprint)",
    "MNC82LL/A" : "US iPhone 7 256GB Black (Sprint)",
    "MNC92LL/A" : "US iPhone 7 256GB Silver (Sprint)",
    "MNCA2LL/A" : "US iPhone 7 256GB Gold (Sprint)",
    "MNCC2LL/A" : "US iPhone 7 256GB Rose Gold (Sprint)",
    "MNCD2LL/A" : "US iPhone 7 256GB Jet Black (Sprint)",
};

iPhoneModels.forEach(function(element) {
    let modelStr = 'MN' + element.m + '2LL/A';
    models[modelStr] = element;
    // console.log(modelStr + ": " + models[modelStr]);
}, this);

// for (let modelStr in models) {
//     console.log(modelStr + ": " + models[modelStr]);
// }

function getDisplayStr(modelCode) {
    let element = models[modelCode];
    if (typeof element == 'string' || element instanceof String) {
        return element;
    }
    return 'iPhone 7+ ' + element.g + 'gb ' + element.c + ' ' + element.p;
}

function getModel(modelCode) {
    let element = models[modelCode];
    if (typeof element == 'string' || element instanceof String) {
        return;
    }
    return element;
}
    
module.exports = {
    models: models,
    getModel : getModel
}
