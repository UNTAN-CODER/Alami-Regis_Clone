import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import {
  Text,
  Center,
  VStack,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "native-base";

import Step1 from "./BeneficaryRegistrasion/Step1";
import FormStepIndicator from "../components/FormStepIndicator";

export default function BeneficaryRegistration() {
  const [formStepVal, setFormStep] = useState(0);

  const currentStep = () => {
    if (formStepVal == 0) {
      return <Step1 />;
    } else if (formStepVal == 1) {
      return <Step1 />;
    } else if (formStepVal == 2) {
      return <Step1 />;
    }

    return <Step1 />;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <VStack h="100%">
        <Center mb="4" px="8" pt="4">
          <Image
            alt="Alami syariah logo"
            source={{
              uri: "https://p2p.alamisharia.co.id/resources/projectx/images/logo/ALAMI%20BLUE.png",
            }}
            width="32"
            height="8"
            mb="8"
          />
          <Text
            fontSize="lg"
            color="#013c50"
            textAlign="center"
            fontFamily="OpenSans_400Regular"
          >
            Registrasi Penerima Dana
          </Text>
        </Center>
        <FormStepIndicator />
        <VStack flex={1} mt="8">
          <ScrollView showsVerticalScrollIndicator={false} px="8" pt="4">
            {currentStep()}
          </ScrollView>
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  );
}
