/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import {NumericID} from '../../value-objects';
import {
	APIContext,
	buildAuthorizedHTTPRequest,
	buildURL,
	fetch,
	omitUndefinedShallow,
	parseJSONResponse
} from '../utils';
import {isNumber} from 'lodash';

export const makeUpdateOneUserSearchGroup = (context: APIContext) => {
	return async (userID: NumericID, groupID: NumericID): Promise<void> => {
		try {
			const path = '/api/users/{userID}/searchgroup';
			const url = buildURL(path, { ...context, protocol: 'http', pathParams: { userID } });

			const body: UpdateOneUserSearchGroupRawRequest = omitUndefinedShallow({
				GID: isNumber(groupID) ? groupID : parseInt(groupID, 10),
			});

			const req = buildAuthorizedHTTPRequest(context, {
				body: JSON.stringify(body),
			});

			const raw = await fetch(url, { ...req, method: 'PUT' });
			return parseJSONResponse(raw, { expect: 'void' });
		} catch (err) {
			if (err instanceof Error) throw err;
			throw Error('Unknown error');
		}
	}
}

interface UpdateOneUserSearchGroupRawRequest {
	GID: number;
}
