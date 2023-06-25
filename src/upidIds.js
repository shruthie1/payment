console.log('In Upi ids');
export class UpiIds {
    static paytm1 = 'paytmqr281005050101xv6mfg02t4m9@paytm';
    static paytm2 = 'paytmqr281005050101jnirp1ueoe1y@paytm';
    static paytm3= 'reddygirl@apl';
    static ppay= 'bharatpe.0851610820@icici';
    static bpayGen= 'bharatpe.0851610820@icici';
    static bpay2= 'reddygirl3@airtel';
    static axisUPI= 'lakshmi.stores6160@axisbank';
    static gpay= 'reddygirl3@airtel';
    static defaultId= 'lakshmi-69@paytm';

    static getUpiId(key) {
        return UpiIds[key];
    }

    static setUpiId(key, value) {
        UpiIds[key] = value;
    }
}

export function assigntoUpis(jsonData) {
    Object.entries(jsonData).forEach(([key, value]) => {
        if (UpiIds.hasOwnProperty(key)) {
            UpiIds.setUpiId(key, value);
        }
    });
    console.log("Upi Ids sett!!")
}

export async function setUpiIds() {
    try {
        const response = await fetch("https://uptimechecker.onrender.com/getAllUpiIds");
        const data = await response.json();
        assigntoUpis(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}
