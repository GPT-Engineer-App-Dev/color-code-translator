import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [hexCode, setHexCode] = useState("");
  const [colorName, setColorName] = useState("");
  const toast = useToast();

  const handleHexChange = (event) => {
    setHexCode(event.target.value);
  };

  const fetchColorName = async () => {
    try {
      const response = await fetch(`https://api.color.pizza/v1/${hexCode}`);
      if (!response.ok) {
        throw new Error("Color not found");
      }
      const data = await response.json();
      if (data.colors && data.colors.length > 0) {
        setColorName(data.colors[0].name);
      } else {
        throw new Error("Color not found");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setColorName("");
    }
  };

  return (
    <Container centerContent p={8}>
      <VStack spacing={4} width="100%">
        <FormControl id="hex-code">
          <FormLabel>Enter HEX code (without '#')</FormLabel>
          <Input placeholder="e.g., 1abc9c" maxLength={6} value={hexCode} onChange={handleHexChange} />
        </FormControl>
        <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={fetchColorName} isDisabled={hexCode.length !== 6}>
          Translate Color
        </Button>
        {colorName && (
          <Box p={4} bg={`#${hexCode}`} color="white" borderRadius="md">
            <Text fontSize="xl">{colorName}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
