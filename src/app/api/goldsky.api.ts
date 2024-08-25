import { ApiLibrary } from '@/libs';
import { ApiConfig } from '@/configs';
import { I_TaikoGetNFTResponse } from '@/shared/interfaces';

export class GoldskyApi extends ApiLibrary {
	constructor() {
		super(ApiConfig.goldskyApi);
	}

	public async getNFT(address: string): Promise<I_TaikoGetNFTResponse> {
		const path =
			'/api/public/project_clzgosmls42bq01wi0shn6fpi/subgraphs/tbz/2.1.10/gn';
		const data = {
			query: `query UserNfts($address: String) {
                owner(id: $address) {
                  id
                  totalMultiplier
                  factionMultiplier
                  snaefellMultiplier
                  taikoonMultiplier
                  ownedTokens {
                    contract {
                      name
                    }
                    id
                    tokenId
                    badgeId
                    uri
                  }
                }
              }`,
			variables: { address },
		};
		const headers = {
			accept: '*/*',
			'accept-language': 'id,en-US;q=0.9,en;q=0.8,id-ID;q=0.7',
			'content-type': 'application/json',
			origin: 'https://trailblazers.taiko.xyz',
			priority: 'u=1, i',
			referer: 'https://trailblazers.taiko.xyz/',
			'sec-ch-ua':
				'"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"Windows"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'cross-site',
			'user-agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
		};

		return await this.post<I_TaikoGetNFTResponse>(path, data, { headers });
	}
}
