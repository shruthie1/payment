import { setUpiIds, getClients, UpiIds } from "./upidIds";
export const endpoint = `mode=02`//&mam=15
setUpiIds();
function selectOne(array) {
    if (array.length === 0) {
        return undefined; // Return undefined if the array is empty
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const profiles = {}
let activeProfile = 'shruthi1';

export function setActiveProfile(profile) {
    if (profile) {
        activeProfile = profile
    }
}

export function getActiveProfile() {
    return activeProfile?.toLowerCase()
}

export async function setProfiles() {
    if (Object.keys(profiles).length === 0) {
        const apiResponse = await getClients();
        apiResponse.forEach((profileData) => {
            const { clientId } = profileData;
            profiles[clientId] = { clientId, name: `Ms ${profileData['name']}`, product: profileData.product, upi: UpiIds.bpayGen, telegram: profileData['username'], age: selectOne([20, 21, 22, 23, 24, 25]), location: selectOne(["Tirupati", "LB Nagar", "HiTech City", "Bangalore", "Mumbai", "Hyderabad", "Chennai"]) };
        });
    }
    return profiles
}

export default profiles;