import React, { useState, useEffect } from "react";

import zxcvbn from "zxcvbn";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  Text,
  VStack,
  FormControl,
  Input,
  IconButton,
  Button,
  Select,
  CheckIcon,
  ScrollView,
  Progress,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Step1() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const [passwordStrength, setPasswordStrength] = useState<any>(null);

  return (
    <VStack fontFamily="WorkSans_400Regular">
      <Text
        fontSize="lg"
        color="#00c3ad"
        fontFamily="WorkSans_400Regular"
        mb="2"
      >
        Profil PIC
      </Text>
      <Formik
        initialValues={{
          namaLengkap: "",
          email: "",
          noHandphone: "",
          password: "",
          passwordConfirmation: "",
          referralCode: "",
          getKnowBy: "",
          getKnowByLainnya: "",
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={Step1FormSchema}
        validateOnChange
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          isSubmitting,
          isValidating,
          errors,
          touched,
        }) => (
          <VStack>
            {/* Nama */}
            <FormControl
              mb="4"
              isInvalid={
                Boolean(touched.namaLengkap) && Boolean(errors.namaLengkap)
              }
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Nama Lengkap
                </Text>
              </FormControl.Label>
              <Input
                type="text"
                placeholder="Nama lengkap sesuai e-KTP"
                onChangeText={handleChange("namaLengkap")}
                onBlur={handleBlur("namaLengkap")}
                value={values.namaLengkap}
                autoCapitalize="words"
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                inValidOutlineColor="#e7e7e7"
                _invalid={{
                  borderColor: "#e7e7e7",
                }}
                fontFamily="WorkSans_400Regular"
              />
              <FormControl.ErrorMessage>
                <Text color="rgb(220, 53, 69)" fontWeight="700">
                  {errors.namaLengkap}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>
            {/* Email */}
            <FormControl
              mb="4"
              isInvalid={Boolean(touched.email) && Boolean(errors.email)}
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Email
                </Text>
              </FormControl.Label>
              <Input
                type="email-address"
                keyboardType="email-address"
                autoCapitalize={"none"}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                inValidOutlineColor="#e7e7e7"
                _invalid={{
                  borderColor: "#e7e7e7",
                }}
                fontFamily="WorkSans_400Regular"
              />
              <FormControl.ErrorMessage>
                <Text color="rgb(220, 53, 69)" fontWeight="700">
                  {errors.email}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>
            {/* Nomor Handphone */}
            <FormControl
              mb="4"
              isInvalid={
                Boolean(touched.noHandphone) && Boolean(errors.noHandphone)
              }
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  No. Handphone
                </Text>
              </FormControl.Label>

              <Input
                type="text"
                keyboardType="phone-pad"
                placeholder="Nomor Handphone"
                onChangeText={handleChange("noHandphone")}
                onBlur={handleBlur("noHandphone")}
                value={values.noHandphone}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                inValidOutlineColor="#e7e7e7"
                _invalid={{
                  borderColor: "#e7e7e7",
                }}
                fontFamily="WorkSans_400Regular"
              />
              <FormControl.ErrorMessage>
                <Text color="rgb(220, 53, 69)" fontWeight="700">
                  {errors.noHandphone}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Password */}
            <FormControl
              mb="4"
              isInvalid={Boolean(touched.password) && Boolean(errors.password)}
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Password
                </Text>
              </FormControl.Label>

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Kata"
                onChangeText={(text) => {
                  setFieldValue("password", text);
                  if (text) {
                    const result = zxcvbn(text);
                    if (result.score != null) {
                      setPasswordStrength(strength[result.score]);
                    }
                  } else {
                    setPasswordStrength(null);
                  }
                }}
                onBlur={handleBlur("password")}
                autoCapitalize="none"
                value={values.password}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                inValidOutlineColor="#e7e7e7"
                _invalid={{
                  borderColor: "#e7e7e7",
                }}
                fontFamily="WorkSans_400Regular"
                InputRightElement={
                  <IconButton
                    variant="ghost"
                    _icon={{
                      as: Ionicons,
                      name: "eye-outline",
                      color: !showPassword ? "gray.800" : "gray.400",
                    }}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                }
              />

              <FormControl.ErrorMessage>
                <Text color="rgb(220, 53, 69)" fontWeight="700">
                  {errors.password}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Password strength */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Kekuatan Password:{" "}
                  {passwordStrength ? passwordStrength["label"] : "-"}
                </Text>
              </FormControl.Label>

              <Progress
                size="2xl"
                mb={4}
                value={passwordStrength ? passwordStrength["progress"] : 0}
                borderRadius="sm"
                _filledTrack={{
                  bgColor: passwordStrength ? passwordStrength["color"] : "red",
                  borderRadius: "sm",
                }}
              />
            </FormControl>

            {/* Konfirmasi Password */}
            <FormControl
              mb="4"
              isInvalid={
                Boolean(touched.passwordConfirmation) &&
                Boolean(errors.passwordConfirmation)
              }
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Konfirmasi Password
                </Text>
              </FormControl.Label>
              <Input
                type={showPasswordConfirmation ? "text" : "password"}
                placeholder="Kata Sandi"
                onChangeText={handleChange("passwordConfirmation")}
                onBlur={handleBlur("passwordConfirmation")}
                value={values.passwordConfirmation}
                autoCapitalize="none"
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                inValidOutlineColor="#e7e7e7"
                _invalid={{
                  borderColor: "#e7e7e7",
                }}
                fontFamily="WorkSans_400Regular"
                InputRightElement={
                  <IconButton
                    variant="ghost"
                    _icon={{
                      as: Ionicons,
                      name: "eye-outline",
                      color: !showPasswordConfirmation
                        ? "gray.800"
                        : "gray.400",
                    }}
                    onPress={() => {
                      setShowPasswordConfirmation(!showPasswordConfirmation);
                    }}
                  />
                }
              />
              <FormControl.ErrorMessage>
                <Text color="rgb(220, 53, 69)" fontWeight="700">
                  {errors.passwordConfirmation}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Kode referral */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Kode Referral (Opsional)
                </Text>
              </FormControl.Label>
              <Input
                type="text"
                placeholder="Kode"
                onChangeText={handleChange("referralCode")}
                onBlur={handleBlur("referralCode")}
                value={values.referralCode}
                autoCapitalize="characters"
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                inValidOutlineColor="#e7e7e7"
                _invalid={{
                  borderColor: "#e7e7e7",
                }}
                fontFamily="WorkSans_400Regular"
              />
            </FormControl>
            {/* Bagaimana mengetahui Alami */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Bagaimana Kamu tahu ALAMI? (Opsional)
                </Text>
              </FormControl.Label>
              <Select
                selectedValue={values.getKnowBy}
                minWidth="200"
                // accessibilityLabel="Silahkan Pilih"
                placeholder="--Silahkan Pilih--"
                // onBlur={handleBlur("getKnowBy")}
                _selectedItem={{
                  bg: "#e7e7e7",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={handleChange("getKnowBy")}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                fontFamily="WorkSans_400Regular"
              >
                <Select.Item
                  label="Facebook"
                  value="facebook"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Instagram"
                  value="instagram"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="LinkedIn"
                  value="linkedin"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item label="Lainnya" value="lainnya" />
                <Select.Item
                  label="LPSE Jabar"
                  value="lpse-jabar"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
              </Select>

              {values.getKnowBy == "lainnya" && (
                <Input
                  type="text"
                  placeholder="Lainnya"
                  onChangeText={handleChange("getKnowByLainnya")}
                  onBlur={handleBlur("getKnowByLainnya")}
                  value={values.getKnowByLainnya}
                  bgColor="#f9f9f9"
                  py="11px"
                  px="20px"
                  borderColor="#e7e7e7"
                  mt="4"
                  fontFamily="WorkSans_400Regular"
                />
              )}
            </FormControl>
            <Button
              onPress={() => {
                // handleSubmit();
                // setFormStepVal(1);
              }}
              borderRadius="full"
              bgColor="#ff8218"
              // shadow="3"

              isLoading={isValidating || isSubmitting}
              // isLoading={true}
              isDisabled={isSubmitting}
              px="8"
              py="4"
              mb="8"
              mt="4"
            >
              <Text fontFamily="OpenSans_600SemiBold" color="white">
                Lanjutkan
              </Text>
            </Button>
          </VStack>
        )}
      </Formik>
    </VStack>
  );
}

const Step1FormSchema = Yup.object().shape({
  namaLengkap: Yup.string().required("Bagian ini harus diisi"),
  email: Yup.string()
    .email("Silahkan isi email dengan format yang benar")
    .required("Bagian ini harus diisi"),

  noHandphone: Yup.string().required("Bagian ini harus diisi"),
  password: Yup.string()
    .min(8, "Minimun 8 karakter")
    .required("Bagian ini harus diisi"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak sama")
    .required("Bagian ini harus diisi"),
});

var strength: { [key: number]: any } = {
  0: {
    progress: 20,
    label: "Lemah",
    color: "#ff0000",
  },
  1: {
    progress: 40,
    label: "Kurang Bagus",
    color: "#ff0000",
  },
  2: {
    progress: 60,
    label: "Bagus",
    color: "#ffa500",
  },
  3: {
    progress: 80,
    label: "Kuat",
    color: "#d4ff19",
  },
  4: {
    progress: 100,
    label: "Sangat Kuat",
    color: "#008000",
  },
};
