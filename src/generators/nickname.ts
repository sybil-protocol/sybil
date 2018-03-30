const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

const defaultAdjectives = [
    'aged', 'ancient', 'autumn', 'billowing', 'bitter', 'black', 'blue', 'bold',
    'broad', 'broken', 'calm', 'cold', 'cool', 'crimson', 'curly', 'damp',
    'dark', 'dawn', 'delicate', 'divine', 'dry', 'empty', 'falling', 'fancy',
    'flat', 'floral', 'fragrant', 'frosty', 'gentle', 'green', 'hidden', 'holy',
    'icy', 'jolly', 'lingering', 'little', 'lively', 'long', 'lucky',
    'misty', 'morning', 'muddy', 'mute', 'nameless', 'noisy', 'odd', 'old',
    'orange', 'patient', 'plain', 'polished', 'proud', 'purple', 'quiet', 'rapid',
    'raspy', 'red', 'restless', 'rough', 'round', 'royal', 'shiny', 'shrill',
    'shy', 'silent', 'small', 'snowy', 'soft', 'solitary', 'sparkling', 'spring',
    'square', 'steep', 'still', 'summer', 'super', 'sweet', 'throbbing', 'tight',
    'tiny', 'twilight', 'wandering', 'weathered', 'white', 'wild', 'winter', 'wispy',
    'withered', 'yellow', 'young'
];

const defaultNouns = [
    'Vitalik', 'Szabo', 'Satoshi', 'Finney', 'Hughes', 'Zooko', 'Gilmore', 'Chaum',
    'Turing', 'Church', 'Lee', 'Merkle', 'Schneier', 'Rivest', 'Shamir', 'Adleman',
    'Diffie', 'Goldwasser', 'Elgamal', 'Dai', 'Rabin', 'Paillier', 'Naor', 'Micali',
    'Koblitz', 'Hellman', 'Adleman', 'Yung', 'Naccache', 'Menezes', 'Vanstone',
    'Snowden', 'Manning', 'Ada', 'Babbage'
];

const generateNickname = (address: string) => {
    address = address.slice(2);
    const idx1 = parseInt(address.slice(0, 16), 16) % defaultAdjectives.length;
    const idx2 = parseInt(address.slice(16, 32), 16) % defaultNouns.length;
    return capitalize(defaultAdjectives[idx1]) + ' ' + capitalize(defaultNouns[idx2]);
}

export default generateNickname;