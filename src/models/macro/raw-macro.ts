/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { RawNumericID } from '~/value-objects';

export interface RawMacro {
	ID: RawNumericID;
	UID: RawNumericID;
	GIDs: Array<RawNumericID> | null;
	Name: string;
	Description: string; // Empty string is null
	Expansion: string;
	Labels: Array<string> | null;
	LastUpdated: string; // Timestamp
	Synced: boolean;
}
