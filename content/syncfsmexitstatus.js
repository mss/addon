/* ***** BEGIN LICENSE BLOCK *****
 * 
 * "The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 * 
 * The Original Code is Zindus Sync.
 * 
 * The Initial Developer of the Original Code is Moniker Pty Ltd.
 *
 * Portions created by Initial Developer are Copyright (C) 2007
 * the Initial Developer. All Rights Reserved.
 * 
 * Contributor(s): Leni Mayo
 * 
 * ***** END LICENSE BLOCK *****/

function SyncFsmExitStatus()
{
	this.m_exit_status = null;
	this.m_fail_code   = null; // one of the Fail* codes
	this.m_fail_detail = null;
}

SyncFsmExitStatus.FailOnService   = 0; // some sort of service failure (generated by mozilla)
SyncFsmExitStatus.FailOnFault     = 1; // recived a soap fault
SyncFsmExitStatus.FailOnCancel    = 2; // user cancelled
SyncFsmExitStatus.FailOnIntegrity = 3; // something wrong with the inputs to the fsm
SyncFsmExitStatus.FailOnUnknown   = 4; // this should never be!

SyncFsmExitStatus.prototype.toString = function()
{
	var ret = "";
	
	ret += "exit_status: " + this.m_exit_status;

	if (this.m_exit_status)
	{
		ret += " fail_code: "   + SyncFsmExitStatus.failCodeAsString(this.m_fail_code);
		ret += " fail_detail: " + this.m_fail_detail;
	}

	return ret;
}

SyncFsmExitStatus.failCodeAsString = function(code)
{
	var stringid = "status";

	switch(code)
	{
		case SyncFsmExitStatus.FailOnService:   stringid += "FailOnService";   break;
		case SyncFsmExitStatus.FailOnFault:     stringid += "FailOnFault";     break;
		case SyncFsmExitStatus.FailOnCancel:    stringid += "FailOnCancel";    break;
		case SyncFsmExitStatus.FailOnIntegrity: stringid += "FailOnIntegrity"; break;
		case SyncFsmExitStatus.FailOnUnknown:   stringid += "FailOnUnknown";   break;
		default: zinAssert(false);
	}

	return stringBundleString(stringid);
}
