import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import Property from '../components/Property'
import Image from "next/image";
import noresult from '../assets/noresult.svg'
import { fetchAPI, baseURL } from "../utils/fetchAPI";

const Search = ({properties}) => {
  const [searchFilters, setsearchFilters] = useState(false);
  const router = useRouter();

  return (
    <>
      <Box>
        <Flex
          alignItems='center'
          justifyContent='center'
          fontSize='lg'
          fontWeight='black'
          p='2'
          cursor='pointer'
          bg='gray.100'
          borderBottom='1px'
          borderColor='gray.200'
          onClick={() => setsearchFilters((prevfilters) => !prevfilters)}
        >
          <Text>Search Property By Filters</Text>
          <Icon paddingLeft='2' w='7' as={BsFilter} />
        </Flex>
        {searchFilters && <SearchFilters />}
        <Text fontSize='2xl' p='4' fontWeight='bold'>
        Properties {router.query.purpose}
        </Text>
        <Flex flexWrap='wrap'>
            {properties.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
        {properties.length === 0 && (
            <Flex justifyContent='center' alignItems='center' flexDirection='column' marginTop='5' marginBottom='5'>
                <Image alt='no result' src={noresult} />
                <Text marginTop='3' fontSize='2xl'>No results found.</Text>
            </Flex>
        )}
      </Box>
    </>
  );
};

export default Search;

export async function getServerSideProps({query}) {

  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchAPI(`${baseURL}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  return {
      props: {
        properties: data?.hits
      }
  }
}
