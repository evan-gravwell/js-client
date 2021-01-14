/*************************************************************************
 * Copyright 2020 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { Script } from '../../models';
import { APIContext, buildHTTPRequest, buildURL, fetch, HTTPRequestOptions, parseJSONResponse } from '../utils';

export const makeGetOneScriptLibrary = (context: APIContext) => {
	return async (
		authToken: string | null,
		path: string,
		options: { repository?: string; commitID?: string } = {},
	): Promise<Script> => {
		const templatePath = '/api/libs';
		const url = buildURL(templatePath, {
			...context,
			protocol: 'http',
			queryParams: { path, repo: options.repository, commit: options.commitID },
		});

		const baseRequestOptions: HTTPRequestOptions = {
			headers: { Authorization: authToken ? `Bearer ${authToken}` : undefined },
		};
		const req = buildHTTPRequest(baseRequestOptions);

		const raw = await fetch(url, { ...req, method: 'GET' });
		return parseJSONResponse(raw, { expect: 'text' });
	};
};
