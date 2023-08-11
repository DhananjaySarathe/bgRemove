"use client"
import React from 'react'
import {Image,Stack,Heading,Text,Divider,Button, Card, CardHeader, CardBody, CardFooter,ButtonGroup } from '@chakra-ui/react'

const ImgCard = () => {
  return (
    <div>
        <Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='xl'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Project Name..</Heading>
      <Text color='gray' mt='-2.5' >
        23 January
      </Text>
      {/* <Text color='blue.600' fontSize='2xl'>
        $450
      </Text> */}
    </Stack>
  </CardBody>
</Card>
    </div>
  )
}

export default ImgCard