/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { decode as base64Decode } from 'base-64';
import { Playbook } from './playbook';
import { RawPlaybook } from './raw-playbook';
import { RawPlaybookDecodedMetadata } from './raw-playbook-decoded-metadata';

export const toPlaybook = <IncludeBody extends boolean = true>(
	raw: RawPlaybook,
	options: { includeBody?: IncludeBody } = { includeBody: true as any },
): IncludeBody extends true ? Playbook : Omit<Playbook, 'body'> => {
	const metadata: RawPlaybookDecodedMetadata = JSON.parse(base64Decode(raw.Metadata));
	const playbookWithoutBody: Omit<Playbook, 'body'> = {
		uuid: raw.UUID,
		guid: raw.GUID,

		userID: raw.UID.toString(),
		groupIDs: raw.GIDs?.map(id => id.toString()) ?? [],

		name: raw.Name,
		description: raw.Desc.trim() === '' ? null : raw.Desc,
		labels: raw.Labels ?? [],

		isGlobal: raw.Global,
		lastUpdateDate: new Date(raw.LastUpdated),

		coverImageFileGUID:
			(metadata.attachments ?? []).find(o => o.context === 'cover' && o.type === 'image')?.fileGUID ?? null,

		author: {
			name: raw.Author.Name.trim() === '' ? null : raw.Author.Name.trim(),
			email: raw.Author.Email.trim() === '' ? null : raw.Author.Email.trim(),
			company: raw.Author.Company.trim() === '' ? null : raw.Author.Company.trim(),
			url: raw.Author.URL.trim() === '' ? null : raw.Author.URL.trim(),
		},
	};

	const includeBody = options.includeBody ?? true;
	if (includeBody === false) return playbookWithoutBody as any;

	const body = base64Decode(raw.Body);
	const playbook: Playbook = { ...playbookWithoutBody, body };
	return playbook as any;
};
