import type { ActionDefinition } from '@segment/actions-core'
import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'
import dayjs from '../../../lib/dayjs'
import { getEndpointByRegion } from '../regional-endpoints'

const action: ActionDefinition<Settings, Payload> = {
  title: 'Group Identify Group',
  description:
    'Set or update properties of particular groups. Only for use with reverse ETL.',
  defaultSubscription: 'type = "group"',
  fields: {
    insert_id: {
      label: 'Insert ID',
      type: 'string',
      description:
        'Amplitude will deduplicate subsequent events sent with this ID we have already seen before within the past 7 days. Amplitude recommends generating a UUID or using some combination of device ID, user ID, event type, event ID, and time.'
    },
    time: {
      label: 'Timestamp',
      type: 'string',
      description:
        'The timestamp of the event. If time is not sent with the event, it will be set to the request upload time.',
      default: {
        '@path': '$.timestamp'
      }
    },
    group_properties: {
      label: 'Group Properties',
      type: 'object',
      description: 'Additional data tied to the group in Amplitude.',
      default: {
        '@path': '$.traits'
      }
    },
    group_type: {
      label: 'Group Type',
      type: 'string',
      description: 'The type of the group',
      required: true
    },
    group_value: {
      label: 'Group Value',
      type: 'string',
      description: 'The value of the group',
      required: true
    }
  },
  perform: async (request, { payload, settings }) => {

    // Associate group properties
    return request(getEndpointByRegion('groupidentify', settings.endpoint), {
      method: 'post',
      body: new URLSearchParams({
        api_key: settings.apiKey,
        identification: JSON.stringify([
          {
            group_properties: payload.group_properties,
            group_value: payload.group_value,
            group_type: payload.group_type,
            library: 'segment'
          }
        ]),
        options
      } as Record<string, string>)
    })
  }
}

export default action
