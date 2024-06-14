export default class PinataClient {
  private jwt: string;

  private gateway: string;

  private pinataBaseUrl: string;

  private pinJSONToIPFSUrl: string;

  private pinFileToIPFSUrl: string;

  constructor() {
    const JWT = process.env.NEXT_PUBLIC_PINATA_JWT as string;
      

    this.jwt = JWT;
    this.gateway = "https://d16c97c2np8a2o.cloudfront.net";
    this.pinataBaseUrl = "https://api.pinata.cloud".replace(/\/$/, "");

    this.pinJSONToIPFSUrl = `${this.pinataBaseUrl}/pinning/pinJSONToIPFS`;
    this.pinFileToIPFSUrl = `${this.pinataBaseUrl}/pinning/pinFileToIPFS`;
  }

  // async pinJSONToIPFS() {
  //   try {
  //     const data = JSON.stringify({
  //       pinataContent: {
  //         name: "Pinnie",
  //         description: "A really sweet NFT of Pinnie the Pinata",
  //         image:
  //           "ipfs://bafkreih5aznjvttude6c3wbvqeebb6rlx5wkbzyppv7garjiubll2ceym4",
  //         external_url: "https://pinata.cloud",
  //       },
  //       pinataMetadata: {
  //         name: "metadata.json",
  //       },
  //     });
  //     const res = await fetch(
  //       "https://api.pinata.cloud/pinning/pinJSONToIPFS",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${this.JWT}`,
  //         },
  //         body: data,
  //       }
  //     );
  //     const resData = await res.json();
  //     console.log(resData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  fileUrl(cid: string) {
    return `${this.gateway}/ipfs/${cid}`;
  }

  fetchText(cid: string) {
    const url = this.fileUrl(cid);
    return fetch(url).then((resp) => resp.text());
  }

  fetchJson(cid: string) {
    const url = this.fileUrl(cid);
    return fetch(url).then((resp) => resp.json());
  }

  baseRequestData(name: string, additionalMetadata?: Record<string, string>) {
    return {
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name,
        keyvalues: {
          product: "grants-stack",
          ...additionalMetadata,
        },
      },
    };
  }

  pinJSON(object: unknown, additionalMetadata?: Record<string, string>) {
    const data = {
      ...this.baseRequestData("debate-and-donate", additionalMetadata),
      pinataContent: object,
    };

    return fetch(this.pinJSONToIPFSUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.jwt}`,
      },
      body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }

      return Promise.reject(resp);
    });
  }

  pinFile(file: Blob) {
    const fd = new FormData();
    const requestData = this.baseRequestData("event-image");

    fd.append("file", file);
    fd.append("pinataOptions", JSON.stringify(requestData.pinataOptions));
    fd.append("pinataMetadata", JSON.stringify(requestData.pinataMetadata));

    return fetch(this.pinFileToIPFSUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
      body: fd,
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }

      return Promise.reject(resp);
    });
  }
}
