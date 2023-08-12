"use client"
import React from 'react'
import {Image,Stack,Heading,Text,Divider,Button, Card, CardHeader, CardBody, CardFooter,ButtonGroup } from '@chakra-ui/react'

const ImgCard = ({element}) => {


  return (
    <div>
        <Card maxW='sm'>
  <CardBody>
    <Image
      src={element.imageUrl}
      alt='Green double couch with wooden legs'
      borderRadius='xl'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{element.name}</Heading>
      <Text color='gray' mt='-2.5' >
        {element.date}
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