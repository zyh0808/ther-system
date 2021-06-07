import React from 'react'
import { Result, Button } from 'antd'
import { useHistory } from "react-router-dom"

const Page404 = () => {
  const history = useHistory()
  return (
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => history.goBack()}>返回</Button>}
  />
  )
}

export default Page404