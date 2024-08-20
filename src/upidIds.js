export class UpiIds {
    static paytm1 = 'Q137045557@ybl';
    static paytm2 = 'paytmqr281005050101jnirp1ueoe1y@paytm';
    static paytm3 = 'BHARATPE.8000073302@fbpe&bpsign=RUR1L3B2d1Z2WVJwdVVCNE5OMm4rL3pBS3pMVHF2MTJ0T3VtY3pnOGZUND0';;
    static ppay = "ReddyGirl@apl";
    static bpayGen = 'ReddyGirl@apl';
    static bpay2 = 'BHARATPE.8000073302@fbpe&bpsign=RUR1L3B2d1Z2WVJwdVVCNE5OMm4rL3pBS3pMVHF2MTJ0T3VtY3pnOGZUND0';
    static axisUPI = 'lakshmi.stores6160@axisbank';
    static gpay = 'Q137045557@ybl';
    static defaultId = 'ReddyGirl@apl';
    static gpayid = "Q210249262@ybl"

    static getUpiId(key) {
        return UpiIds[key];
    }

    static setUpiId(key, value) {
        UpiIds[key] = value;
    }

    static defaultUpis = {
        phonepe: UpiIds.ppay,
        gpay: UpiIds.gpay,
        paytm: UpiIds.paytm1,
        others: UpiIds.defaultId
    }

    static setDefaultUpis(){
        UpiIds.defaultUpis = {
            phonepe: UpiIds.ppay,
            gpay: UpiIds.gpay,
            paytm: UpiIds.paytm1,
            others: UpiIds.defaultId
        }
    }
}

export function assigntoUpis(jsonData) {
    Object.entries(jsonData).forEach(([key, value]) => {
        if (UpiIds.hasOwnProperty(key)) {
            console.log(`setting - ${key}:${value}`)
            UpiIds.setUpiId(key, value);
        }
    });
    UpiIds.setDefaultUpis()
}

export async function setUpiIds() {
    try {
        const response = await fetch("https://uptimeChecker2.glitch.me/getAllUpiIds");
        const data = await response.json();
        assigntoUpis(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getClients() {
    const url = `https://uptimeChecker2.glitch.me/clients`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}