// Generated file. DO NOT MODIFY IT BY HAND.

export interface Payload {
    /**
     * Amplitude will deduplicate subsequent events sent with this ID we have already seen before within the past 7 days. Amplitude recommends generating a UUID or using some combination of device ID, user ID, event type, event ID, and time.
     */
    insert_id?: string
    /**
     * The timestamp of the event. If time is not sent with the event, it will be set to the request upload time.
     */
    time?: string
    /**
     * Additional data tied to the group in Amplitude.
     */
    group_properties?: {
      [k: string]: unknown
    }
    /**
     * The type of the group
     */
    group_type: string
    /**
     * The value of the group
     */
    group_value: string
  }
  