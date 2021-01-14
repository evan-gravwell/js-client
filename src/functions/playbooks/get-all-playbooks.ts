/*************************************************************************
 * Copyright 2020 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { Playbook, RawPlaybook, toPlaybook } from '../../models';
import { APIContext, buildHTTPRequest, buildURL, fetch, HTTPRequestOptions, parseJSONResponse } from '../utils';

export const makeGetAllPlaybooks = (context: APIContext) => {
	const playbookPath = '/api/playbooks?admin=true';
	const url = buildURL(playbookPath, { ...context, protocol: 'http' });

	return async (authToken: string | null): Promise<Array<Omit<Playbook, 'body'>>> => {
		const baseRequestOptions: HTTPRequestOptions = {
			headers: { Authorization: authToken ? `Bearer ${authToken}` : undefined },
		};
		const req = buildHTTPRequest(baseRequestOptions);

		const raw = await fetch(url, { ...req, method: 'GET' });
		const rawRes = (await parseJSONResponse<Array<RawPlaybook> | null>(raw)) ?? [];
		return rawRes.map(p => toPlaybook(p, { includeBody: false }));
	};
};
