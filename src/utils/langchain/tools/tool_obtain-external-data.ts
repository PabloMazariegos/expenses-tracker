import { tool } from '@langchain/core/tools'
import { z } from 'zod'

export const obtainName = tool(
	async ({}) => {
		return 'Juan manuel'
	},
	{
		name: 'obtainName',
		description: 'Obtain the name of the user'
	}
)