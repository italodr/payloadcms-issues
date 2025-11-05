import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const localApiData = await payload.findGlobal({
    slug: 'header',
  })

  const restApiDataResponse = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/globals/header?locale=all`,
  )
  const restApiData = restApiDataResponse.json()

  return (
    <>
      <h2>Local API</h2>
      <dl>
        {Object.entries(localApiData).map(([key, value]) => (
          <>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </>
        ))}
      </dl>
      <hr />
      <h2>REST API</h2>
      <dl>
        {Object.entries(restApiData).map(([key, value]) => (
          <>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </>
        ))}
      </dl>
    </>
  )
}
