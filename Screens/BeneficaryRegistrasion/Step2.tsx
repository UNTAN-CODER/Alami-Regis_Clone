import React, { useState, useEffect } from "react";
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
  HStack,
  InputLeftAddon,
  InputGroup,
  Checkbox,
  Link,
  Modal,
  useDisclose,
} from "native-base";

import * as DocumentPicker from "expo-document-picker";

import { Formik } from "formik";
import * as Yup from "yup";

import { format } from "date-fns";

import zxcvbn from "zxcvbn";

import DatePickerAndroid from "@react-native-community/datetimepicker/src/datepicker.android";
import Ionicons from "@expo/vector-icons/Ionicons";

const Step2FormSchema = Yup.object().shape({
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

const bulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function Step2() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const [passwordStrength, setPasswordStrength] = useState<any>(null);

  const [formStep, setFormStep] = useState(0);

  const [daftarProvinsi, setDaftarProvinsi] = useState([]);
  const [daftarKotaKab, setDaftarKotaKab] = useState([]);
  const [daftarKecamatan, setDaftarKecamatan] = useState([]);
  const [daftarKelurahan, setDaftarKelurahan] = useState([]);

  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [selectedKotaKab, setSelectedKotaKab] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedKelurahan, setSelectedKelurahan] = useState("");

  const [establishmentDate, setEstablishmentDate] = useState("");

  const { isOpen, onOpen, onClose } = useDisclose();

  // fetch provinsi
  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setDaftarProvinsi(res);
      });
  }, []);

  // fetch kabupaten
  useEffect(() => {
    if (selectedProvinsi != "") {
      fetch(
        `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${selectedProvinsi}.json`
      )
        .then((res) => res.json())
        .then((res) => {
          setDaftarKotaKab(res);
        });
    }
  }, [selectedProvinsi]);

  // fetch kecamatan
  useEffect(() => {
    if (selectedKotaKab != "") {
      fetch(
        `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${selectedKotaKab}.json`
      )
        .then((res) => res.json())
        .then((res) => {
          setDaftarKecamatan(res);
        });
    }
  }, [selectedKotaKab]);

  // fetch kelurahan
  useEffect(() => {
    if (selectedKecamatan != "") {
      fetch(
        `https://emsifa.github.io/api-wilayah-indonesia/api/villages/${selectedKecamatan}.json`
      )
        .then((res) => res.json())
        .then((res) => {
          setDaftarKelurahan(res);
        });
    }
  }, [selectedKecamatan]);

  return (
    <VStack fontFamily="WorkSans_400Regular">
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

          financingSize: "",
          financingTypeId: "2",
          financingTenorId: "1",
          useOfProceedsId: "1",
          useOfProceeds: "",
          sourceOfRepayment: "",
          sourceOfRepaymentText: "",
          financingPayor: "",
          payorRelationship: "",
          companyTypeId: "1",
          companyName: "",
          companyEstablishmentDate: "",
          companyEstablishmentNumber: "",
          companyProvince: "",
          companyCity: "",
          companySubDistrict: "",
          companyRegency: "",
          companyPostalCode: "",
          companyNpwp: "",
          companyNpwpFile: "",
          companyIncomeYear1: new Date().getFullYear() - 1 + "",
          companyIncomeAmount1: "",
          companyIncomeYear2: new Date().getFullYear() + "",
          companyMonthIncomeAmount2: bulan[new Date().getMonth()],
          companyIncomeAmount2: "",
          financialReport: "",
          langganan: false,
          checkboxKebijakan: false,
          setujuTaxDisclaimerBenef: false,
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={Step2FormSchema}
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
            <Modal isOpen={isOpen} onClose={onClose}>
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header fontSize="4xl" fontWeight="bold">
                  Ketentuan Pajak
                </Modal.Header>
                <Modal.Body>
                  <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                    Berdasarkan UU Nomor 7 Tahun 2021 tentang Harmonisasi
                    Peraturan Perpajakan dan Peraturan Menteri Keuangan Republik
                    Indonesia Nomor 69/PMK.03/2022 tentang Pajak Penghasilan dan
                    Pajak Pertambahan Nilai atas Penyelenggaraan Teknologi
                    Finansial, maka efektif mulai 1 Mei 2022, setiap jumlah
                    Marketplace Fee (“MP Fee”) yang dibayarkan akan dikenakan
                    Pajak Pertambahan Nilai (“PPN”) sebesar 11%.
                  </Text>
                  <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                    Berikut simulasi pembayaran MP Fee setelah adanya PPN:\n
                    Nominal Pembiayaan Didapatkan Beneficiaries: Rp100,000,000\n
                    Ujrah: 16% per annum MP Fees: 3% dari Nominal Pembiayaan\n
                    Nominal MP Fees Sebelum Pengenaan PPN: Rp3,000,000 PPN
                    Rate:\n 11% dari MP Fees Nominal PPN Rate: Rp330,000 Nominal
                    MP Fees\n Setelah Pengenaan PPN: Rp3,330,000\n
                  </Text>

                  <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                    Silakan hubungi Relationship Manager (RM) terkait untuk
                    mempelajari lebih lanjut tentang detail perhitungan pajak MP
                    Fee ini. ALAMI akan menerbitkan Faktur Pajak yang dapat
                    diakses melalui Dashboard akun Beneficiary dan akan
                    dikirimkan melalui email secara sistem. Adapun imbal hasil
                    yang dibayarkan kepada pendana maka akan tetap dibayarkan
                    penuh oleh pihak Beneficiaries. Imbal hasil tersebut
                    dikenakan pemotongan PPh Pasal 23, namun pemotongannya akan
                    dilakukan oleh ALAMI sebagai WAPU (perusahaan wajib pungut
                    pajak). ALAMI juga akan menerbitkan riwayat pemotongan imbal
                    hasil serta bukti potongnya kepada para pendana.
                  </Text>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="unstyled" mr="1" onPress={onClose}>
                    Terima
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
            <Text
              fontSize="lg"
              color="#00c3ad"
              fontFamily="WorkSans_400Regular"
              mb="2"
            >
              Informasi Pembiayaan
            </Text>
            {/* Financing Size */}
            <FormControl
              mb="4"
              isInvalid={
                Boolean(touched.financingSize) && Boolean(errors.financingSize)
              }
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Nilai Pembiayaan yang Diajukan
                </Text>
              </FormControl.Label>
              <InputGroup>
                <InputLeftAddon
                  children={
                    <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                      Rp.
                    </Text>
                  }
                  w={16}
                />
                <Input
                  type="numeric"
                  keyboardType="numeric"
                  placeholder="0"
                  onChangeText={handleChange("financingSize")}
                  onBlur={handleBlur("financingSize")}
                  value={values.financingSize}
                  // autoCapitalize="words"
                  bgColor="#f9f9f9"
                  py="11px"
                  px="20px"
                  borderColor="#e7e7e7"
                  inValidOutlineColor="#e7e7e7"
                  w="80%"
                  _invalid={{
                    borderColor: "#e7e7e7",
                  }}
                  fontFamily="WorkSans_400Regular"
                />
              </InputGroup>
              <FormControl.ErrorMessage>
                <Text color="rgb(220, 53, 69)" fontWeight="700">
                  {errors.financingSize}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>
            {/* Jenis Pembiayaan */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Jenis Pembiayaan
                </Text>
              </FormControl.Label>
              <Select
                selectedValue={values.financingTypeId}
                defaultValue={values.financingTypeId}
                minWidth="200"
                // accessibilityLabel="Silahkan Pilih"
                placeholder="--Silahkan Pilih--"
                _selectedItem={{
                  bg: "#e7e7e7",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={handleChange("financingTypeId")}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                fontFamily="WorkSans_400Regular"
              >
                <Select.Item
                  value="2"
                  label="Invoice financing"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  value="4"
                  label="AP-G"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />

                <Select.Item
                  value="5"
                  label="AP-D"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />

                <Select.Item
                  value="6"
                  label="AP-V"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />

                <Select.Item
                  value="7"
                  label="AP-P"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  value="8"
                  label="PO Financing"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
              </Select>
            </FormControl>
            {/* Tenor Pembiayaan */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Tenor Pembiayaan
                </Text>
              </FormControl.Label>
              <Select
                selectedValue={values.financingTenorId}
                defaultValue={values.financingTenorId}
                minWidth="200"
                // accessibilityLabel="Silahkan Pilih"
                placeholder="--Silahkan Pilih--"
                _selectedItem={{
                  bg: "#e7e7e7",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={handleChange("financingTenorId")}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                fontFamily="WorkSans_400Regular"
              >
                <Select.Item
                  value="1"
                  label="1 bulan"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  value="2"
                  label="2 bulan"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />

                <Select.Item
                  value="3"
                  label="3 bulan"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />

                <Select.Item
                  value="4"
                  label="4 bulan"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />

                <Select.Item
                  value="5"
                  label="5 bulan"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  value="6"
                  label="6 bulan"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
              </Select>
            </FormControl>
            {/* Tujuan Penggunaan Dana */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Tujuan Penggunaan Dana
                </Text>
              </FormControl.Label>
              <Select
                selectedValue={values.useOfProceedsId}
                minWidth="200"
                // accessibilityLabel="Silahkan Pilih"
                placeholder="--Silahkan Pilih--"
                // onBlur={handleBlur("getKnowBy")}
                _selectedItem={{
                  bg: "#e7e7e7",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={handleChange("useOfProceedsId")}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                fontFamily="WorkSans_400Regular"
              >
                <Select.Item
                  label="Modal Kerja"
                  value="1"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Pencadangan Cash Flow"
                  value="2"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Pembelian Material/Bahan Baku Usaha"
                  value="3"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Pembelian Alat Kerja"
                  value="4"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Operasional Proyek Berjalan"
                  value="5"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Operasional Perusahaan"
                  value="6"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Pembayaran Vendor/Supplier"
                  value="7"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Pembayaran Gaji/THR"
                  value="8"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Sewa Gudang/Kantor/Kendaraan"
                  value="9"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Pembelian Aset Tetap"
                  value="10"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Lainnya"
                  value="99"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
              </Select>

              {values.useOfProceedsId == "99" && (
                <Input
                  type="text"
                  placeholder="Tujuan Penggunaan Dana"
                  onChangeText={handleChange("useOfProceeds")}
                  onBlur={handleBlur("useOfProceeds")}
                  value={values.useOfProceeds}
                  bgColor="#f9f9f9"
                  py="11px"
                  px="20px"
                  borderColor="#e7e7e7"
                  mt="4"
                  fontFamily="WorkSans_400Regular"
                />
              )}
            </FormControl>
            {/* Sumber Dana atas Pengembalian Dana */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Sumber Dana atas Pengembalian Dana
                </Text>
              </FormControl.Label>
              <Select
                selectedValue={values.sourceOfRepayment}
                minWidth="200"
                // accessibilityLabel="Silahkan Pilih"
                placeholder="--Silahkan Pilih--"
                _selectedItem={{
                  bg: "#e7e7e7",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={handleChange("sourceOfRepayment")}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                fontFamily="WorkSans_400Regular"
              >
                <Select.Item
                  label="Hasil Pengelolaan Kegiatan Usaha"
                  value="1"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Hasil Investasi"
                  value="2"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Pinjaman"
                  value="3"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Penerbitan Sekuritas (Saham/Obligasi/Produk Investasi Lain)"
                  value="4"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Hibah/Hadiah"
                  value="5"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  label="Lainnya"
                  value="99"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
              </Select>

              {values.sourceOfRepayment == "99" && (
                <Input
                  type="text"
                  placeholder="Sumber Dana atas Pengembalian Dana"
                  onChangeText={handleChange("sourceOfRepaymentText")}
                  onBlur={handleBlur("sourceOfRepaymentText")}
                  value={values.sourceOfRepaymentText}
                  bgColor="#f9f9f9"
                  py="11px"
                  px="20px"
                  borderColor="#e7e7e7"
                  mt="4"
                  fontFamily="WorkSans_400Regular"
                />
              )}
            </FormControl>
            {/* Nama Perusahaan Pemberi Kerja */}
            <FormControl
              mb="4"
              isInvalid={
                Boolean(touched.financingPayor) &&
                Boolean(errors.financingPayor)
              }
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Nama Perusahaan Pemberi Kerja
                </Text>
              </FormControl.Label>
              <Input
                type="text"
                placeholder="Input Nama Perusahaan Pemberi Kerja"
                onChangeText={handleChange("financingPayor")}
                onBlur={handleBlur("financingPayor")}
                value={values.financingPayor}
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
                  {errors.financingPayor}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>
            {/* Hubungan Dengan Pemberi Kerja/Bohir */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Hubungan Dengan Pemberi Kerja/Bohir
                </Text>
              </FormControl.Label>
              <Select
                selectedValue={values.payorRelationship}
                defaultValue={values.payorRelationship}
                minWidth="200"
                // accessibilityLabel="Tidak Ada Yang dipilih"
                placeholder="Tidak Ada Yang dipilih"
                _selectedItem={{
                  bg: "#e7e7e7",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={handleChange("payorRelationship")}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                fontFamily="WorkSans_400Regular"
              >
                <Select.Item
                  value="1"
                  label="<= 1 th"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  value="2"
                  label="> 1 - 2 th"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  value="3"
                  label="> 2 - 3 th"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
                <Select.Item
                  value="4"
                  label="> 3 - 4 th"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />

                <Select.Item
                  value="5"
                  label="> 4 - 5 th"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />

                <Select.Item
                  value="6"
                  label="> 5 th"
                  _text={{ fontFamily: "WorkSans_400Regular" }}
                />
              </Select>
            </FormControl>
            <Text
              fontSize="lg"
              color="#00c3ad"
              fontFamily="WorkSans_400Regular"
              mb="2"
            >
              Profil Perusahaan
            </Text>
            {/* Nama Perusahaan */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Nama Perusahaan
                </Text>
              </FormControl.Label>
              <HStack>
                <InputGroup>
                  <InputLeftAddon
                    children={
                      <Select
                        selectedValue={values.companyTypeId}
                        defaultValue={values.companyTypeId}
                        // minWidth="200"
                        // accessibilityLabel="Silahkan Pilih"
                        placeholder="Tidak Ada Yang Dipilih"
                        _selectedItem={{
                          bg: "#e7e7e7",
                          endIcon: <CheckIcon size="5" />,
                        }}
                        // mt={1}
                        onValueChange={handleChange("companyTypeId")}
                        bgColor="#f9f9f9"
                        py="11px"
                        borderColor="#fff"
                        fontFamily="WorkSans_400Regular"
                        borderTopRightRadius={0}
                        borderBottomRightRadius={0}
                        w="100%"
                      >
                        <Select.Item
                          value="1"
                          label="PT"
                          _text={{ fontFamily: "WorkSans_400Regular" }}
                        />
                        <Select.Item
                          value="2"
                          label="CV"
                          _text={{ fontFamily: "WorkSans_400Regular" }}
                        />
                      </Select>
                    }
                    w="24%"
                    p={0}
                  />
                  <Input
                    type="text"
                    placeholder="Nama Perusahaan"
                    onChangeText={handleChange("companyName")}
                    onBlur={handleBlur("companyName")}
                    value={values.companyName}
                    bgColor="#f9f9f9"
                    py="11px"
                    px="20px"
                    borderColor="#e7e7e7"
                    w="76%"
                    fontFamily="WorkSans_400Regular"
                    borderTopLeftRadius={0}
                    borderBottomLeftRadius={0}
                  />
                </InputGroup>
              </HStack>
            </FormControl>
            {/* Tanggal Pendirian Sesuai Akta */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Tanggal Pendirian Sesuai Akta
                </Text>
              </FormControl.Label>
              <Input
                type="text"
                placeholder="Tanggal Pendirian"
                // onChangeText={handleChange("companyEstablishmentDate")}
                // onBlur={handleBlur("companyEstablishmentDate")}
                // isDisabled={true}
                value={establishmentDate}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                inValidOutlineColor="#e7e7e7"
                onTouchStart={async () => {
                  const res = await DatePickerAndroid.open({
                    mode: "date",
                    is24Hour: true,
                  });

                  const estDate = format(
                    new Date(res.year, res.month, res.day),
                    "dd MMM yyyy"
                  );
                  setEstablishmentDate(estDate);

                  setFieldValue("companyEstablishmentDate", estDate);
                  // todo: set ke form date nya
                }}
                // onFocus={async () => {}}
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
            {/* Nomor Akta Pendirian */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Nomor Akta Pendirian
                </Text>
              </FormControl.Label>
              <Input
                type="numeric"
                keyboardType="numeric"
                placeholder="Input nomor"
                onChangeText={handleChange("companyEstablishmentNumber")}
                onBlur={handleBlur("companyEstablishmentNumber")}
                value={values.companyEstablishmentNumber}
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
                  {errors.companyEstablishmentNumber}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>
            {/* Provinsi */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Provinsi
                </Text>
              </FormControl.Label>
              <Select
                minWidth="200"
                // accessibilityLabel="Tidak Ada Yang Dipilih"
                placeholder="Tidak Ada Yang Dipilih"
                _selectedItem={{
                  bg: "#e7e7e7",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(res) => {
                  setFieldValue("companyProvince", res.split("-")[1]);
                  setSelectedProvinsi(res.split("-")[0]);
                }}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                fontFamily="WorkSans_400Regular"
              >
                {daftarProvinsi.length > 0 ? (
                  daftarProvinsi.map((itm: any, idx) => (
                    <Select.Item
                      key={idx}
                      value={`${itm.id}-${itm.name}`}
                      label={itm.name}
                      _text={{ fontFamily: "WorkSans_400Regular" }}
                    />
                  ))
                ) : (
                  <Select.Item
                    value=""
                    label="Loading ..."
                    _text={{ fontFamily: "WorkSans_400Regular" }}
                  />
                )}
              </Select>
            </FormControl>
            {/* Kota/Kabupaten */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Kota/Kabupaten
                </Text>
              </FormControl.Label>
              <Select
                minWidth="200"
                // accessibilityLabel="Tidak Ada Yang Dipilih"
                placeholder="Tidak Ada Yang Dipilih"
                _selectedItem={{
                  bg: "#e7e7e7",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(res) => {
                  setFieldValue("companyCity", res.split("-")[1]);
                  setSelectedKotaKab(res.split("-")[0]);
                }}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                fontFamily="WorkSans_400Regular"
              >
                {daftarKotaKab.length > 0 ? (
                  daftarKotaKab.map((itm: any, idx) => (
                    <Select.Item
                      key={idx}
                      value={`${itm.id}-${itm.name}`}
                      label={itm.name}
                      _text={{ fontFamily: "WorkSans_400Regular" }}
                    />
                  ))
                ) : (
                  <Select.Item
                    value=""
                    label="Loading ..."
                    _text={{ fontFamily: "WorkSans_400Regular" }}
                  />
                )}
              </Select>
            </FormControl>
            {/* Kecamatan */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Kecamatan
                </Text>
              </FormControl.Label>
              <Select
                minWidth="200"
                // accessibilityLabel="Tidak Ada Yang Dipilih"
                placeholder="Tidak Ada Yang Dipilih"
                _selectedItem={{
                  bg: "#e7e7e7",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(res) => {
                  setFieldValue("companySubDistrict", res.split("-")[1]);
                  setSelectedKecamatan(res.split("-")[0]);
                }}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                fontFamily="WorkSans_400Regular"
              >
                {daftarKecamatan.length > 0 ? (
                  daftarKecamatan.map((itm: any, idx) => (
                    <Select.Item
                      key={idx}
                      value={`${itm.id}-${itm.name}`}
                      label={itm.name}
                      _text={{ fontFamily: "WorkSans_400Regular" }}
                    />
                  ))
                ) : (
                  <Select.Item
                    value=""
                    label="Loading ..."
                    _text={{ fontFamily: "WorkSans_400Regular" }}
                  />
                )}
              </Select>
            </FormControl>
            {/* Kelurahan */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Kelurahan
                </Text>
              </FormControl.Label>
              <Select
                minWidth="200"
                // accessibilityLabel="Tidak Ada Yang Dipilih"
                placeholder="Tidak Ada Yang Dipilih"
                _selectedItem={{
                  bg: "#e7e7e7",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(res) => {
                  setFieldValue("companyRegency", res.split("-")[1]);
                  setSelectedKelurahan(res.split("-")[0]);
                }}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                fontFamily="WorkSans_400Regular"
              >
                {daftarKelurahan.length > 0 ? (
                  daftarKelurahan.map((itm: any, idx) => (
                    <Select.Item
                      key={idx}
                      value={`${itm.id}-${itm.name}`}
                      label={itm.name}
                      _text={{ fontFamily: "WorkSans_400Regular" }}
                    />
                  ))
                ) : (
                  <Select.Item
                    value=""
                    label="Loading ..."
                    _text={{ fontFamily: "WorkSans_400Regular" }}
                  />
                )}
              </Select>
            </FormControl>
            {/* Kodepos */}
            <FormControl
              mb="4"
              isInvalid={
                Boolean(touched.companyPostalCode) &&
                Boolean(errors.companyPostalCode)
              }
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Kodepos
                </Text>
              </FormControl.Label>

              <Input
                type="numeric"
                keyboardType="numeric"
                placeholder="Kode pos"
                onChangeText={handleChange("companyPostalCode")}
                onBlur={handleBlur("companyPostalCode")}
                value={values.companyPostalCode}
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
                  {errors.companyPostalCode}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>
            {/* NPWP Perusahaan */}
            <FormControl
              mb="4"
              isInvalid={
                Boolean(touched.companyPostalCode) &&
                Boolean(errors.companyPostalCode)
              }
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  NPWP Perusahaan
                </Text>
              </FormControl.Label>

              <Input
                type="numeric"
                keyboardType="numeric"
                placeholder="NPWP Perusahaan"
                onChangeText={handleChange("companyNpwp")}
                onBlur={handleBlur("companyNpwp")}
                value={values.companyNpwp}
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
                  {errors.companyNpwp}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>
            {/* NPWP Perusahaan (File) */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  NPWP Perusahaan
                </Text>
              </FormControl.Label>
              <Input
                type="text"
                placeholder="Choose file"
                // isDisabled={true}
                // onChangeText={handleChange("companyNpwpFile")}
                // onBlur={handleBlur("companyNpwpFile")}
                value={values.companyNpwpFile}
                // autoCapitalize="characters"
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
                  <Button
                    size="xs"
                    rounded="none"
                    w="1/5"
                    h="full"
                    onPress={async () => {
                      // companyNpwpFile
                      const result = await DocumentPicker.getDocumentAsync({
                        copyToCacheDirectory: false,
                      });
                      console.log(result);
                      // todo: set file to form
                    }}
                  >
                    Browse
                  </Button>
                }
              />
            </FormControl>
            <Text
              fontSize="lg"
              color="#00c3ad"
              fontFamily="WorkSans_400Regular"
              mb="2"
            >
              Pendapatan Perusahaan
            </Text>
            {/* Periode (Tahun Sebelumnya) */}
            <FormControl
              mb="4"
              isInvalid={
                Boolean(touched.companyIncomeYear1) &&
                Boolean(errors.companyIncomeYear1)
              }
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Periode (Tahun Sebelumnya)
                </Text>
              </FormControl.Label>
              <Input
                type="text"
                // placeholder="Nama lengkap sesuai e-KTP"
                // onChangeText={handleChange("companyIncomeYear1")}
                // onBlur={handleBlur("companyIncomeYear1")}
                value={values.companyIncomeYear1}
                // autoCapitalize="words"
                isDisabled={true}
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
                  {errors.companyIncomeYear1}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>
            {/* Pendapatan (Penjualan) */}
            <FormControl
              mb="4"
              isInvalid={
                Boolean(touched.companyIncomeAmount1) &&
                Boolean(errors.companyIncomeAmount1)
              }
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Pendapatan (Penjualan)
                </Text>
              </FormControl.Label>
              <InputGroup>
                <InputLeftAddon
                  children={
                    <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                      Rp.
                    </Text>
                  }
                  w={16}
                />
                <Input
                  type="numeric"
                  keyboardType="numeric"
                  placeholder="0"
                  onChangeText={handleChange("companyIncomeAmount1")}
                  onBlur={handleBlur("companyIncomeAmount1")}
                  value={values.companyIncomeAmount1}
                  // autoCapitalize="words"
                  bgColor="#f9f9f9"
                  py="11px"
                  px="20px"
                  borderColor="#e7e7e7"
                  inValidOutlineColor="#e7e7e7"
                  w="80%"
                  _invalid={{
                    borderColor: "#e7e7e7",
                  }}
                  fontFamily="WorkSans_400Regular"
                />
              </InputGroup>
              <FormControl.ErrorMessage>
                <Text color="rgb(220, 53, 69)" fontWeight="700">
                  {errors.companyIncomeAmount1}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>
            {/* Periode Berjalan */}
            <FormControl
              mb="4"
              isInvalid={
                Boolean(touched.companyIncomeYear1) &&
                Boolean(errors.companyIncomeYear1)
              }
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Periode Berjalan
                </Text>
              </FormControl.Label>
              <Input
                type="text"
                // placeholder="Nama lengkap sesuai e-KTP"
                // onChangeText={handleChange("companyIncomeYear1")}
                // onBlur={handleBlur("companyIncomeYear1")}
                value={values.companyIncomeYear2}
                // autoCapitalize="words"
                isDisabled={true}
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
                  {errors.companyIncomeYear2}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>
            {/* Bulan Periode Berjalan*/}
            <FormControl mb="4">
              <Select
                selectedValue={values.companyMonthIncomeAmount2}
                defaultValue={values.companyMonthIncomeAmount2}
                minWidth="200"
                // accessibilityLabel="Silahkan Pilih"
                placeholder="--Silahkan Pilih--"
                _selectedItem={{
                  bg: "#e7e7e7",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={handleChange("companyMonthIncomeAmount2")}
                bgColor="#f9f9f9"
                py="11px"
                px="20px"
                borderColor="#e7e7e7"
                fontFamily="WorkSans_400Regular"
              >
                {Array.from(Array(12).keys()).map((itm) => (
                  <Select.Item
                    key={itm}
                    value={bulan[itm]}
                    label={bulan[itm]}
                    _text={{ fontFamily: "WorkSans_400Regular" }}
                  />
                ))}
              </Select>
            </FormControl>
            {/* Pendapatan (Penjualan) Periode Berjalan */}
            <FormControl
              mb="4"
              isInvalid={
                Boolean(touched.companyIncomeAmount2) &&
                Boolean(errors.companyIncomeAmount2)
              }
            >
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Pendapatan (Penjualan)
                </Text>
              </FormControl.Label>
              <InputGroup>
                <InputLeftAddon
                  children={
                    <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                      Rp.
                    </Text>
                  }
                  w={16}
                />
                <Input
                  type="numeric"
                  keyboardType="numeric"
                  placeholder="0"
                  onChangeText={handleChange("companyIncomeAmount2")}
                  onBlur={handleBlur("companyIncomeAmount2")}
                  value={values.companyIncomeAmount2}
                  // autoCapitalize="words"
                  bgColor="#f9f9f9"
                  py="11px"
                  px="20px"
                  borderColor="#e7e7e7"
                  inValidOutlineColor="#e7e7e7"
                  w="80%"
                  _invalid={{
                    borderColor: "#e7e7e7",
                  }}
                  fontFamily="WorkSans_400Regular"
                />
              </InputGroup>
              <FormControl.ErrorMessage>
                <Text color="rgb(220, 53, 69)" fontWeight="700">
                  {errors.companyIncomeAmount2}
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>
            <Text fontFamily="WorkSans_400Regular" color="#7a828a">
              Note: Pilih bulan terakhir laporan keuangan periode berjalan (Ex:
              Laporan keuangan Januari-Agustus isi dengan Agustus)
            </Text>
            {/* NPWP Perusahaan (File) */}
            <FormControl mb="4">
              <FormControl.Label>
                <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                  Laporan Keuangan
                </Text>
              </FormControl.Label>
              <Input
                type="text"
                placeholder="Choose file"
                // isDisabled={true}
                // onChangeText={handleChange("financialReport")}
                // onBlur={handleBlur("financialReport")}
                value={values.financialReport}
                // autoCapitalize="characters"
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
                  <Button
                    size="xs"
                    rounded="none"
                    w="1/5"
                    h="full"
                    onPress={async () => {
                      // financialReport
                      const result = await DocumentPicker.getDocumentAsync({
                        copyToCacheDirectory: false,
                      });
                      console.log(result);
                      // todo: set file to form
                    }}
                  >
                    Browse
                  </Button>
                }
              />
            </FormControl>
            <Checkbox
              // shadow={2}
              value="langganan"
              isChecked={values.langganan}
              onChange={(isSelected) => {
                setFieldValue("langganan", isSelected);
              }}
              // accessibilityLabel="This is a dummy checkbox"
              // defaultIsChecked
            >
              <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                Saya tertarik update info terbaru ALAMI. (Opsional)
              </Text>
            </Checkbox>
            <Checkbox
              // shadow={2}
              value="checkboxKebijakan"
              isChecked={values.checkboxKebijakan}
              onChange={(isSelected) => {
                setFieldValue("checkboxKebijakan", isSelected);
              }}
              // accessibilityLabel="This is a dummy checkbox"
              // defaultIsChecked
            >
              <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                Saya sudah membaca dan setuju dengan{" "}
                <Link
                  _text={{
                    color: "#007bff",
                    m: 0,
                    p: 0,
                  }}
                  isUnderlined={false}
                  href="https://alamisharia.co.id/kebijakan-privasi/"
                  m="0"
                  p="0"
                  lineHeight="0"
                >
                  Kebijakan Privasi
                </Link>{" "}
                &{" "}
                <Link
                  _text={{
                    color: "#007bff",
                  }}
                  isUnderlined={false}
                  href="https://alamisharia.co.id/ketentuan-pengguna/"
                >
                  Ketentuan Pengguna
                </Link>
                .
              </Text>
            </Checkbox>
            <Checkbox
              // shadow={2}
              value="checkboxKebijakan"
              isChecked={values.setujuTaxDisclaimerBenef}
              // accessibilityLabel="This is a dummy checkbox"
              // defaultIsChecked
            >
              <Text fontFamily="WorkSans_400Regular" color="#7a828a">
                Saya sudah membaca dan mengetahui
                <Link
                  _text={{
                    color: "#007bff",
                  }}
                  isUnderlined={false}
                  onTouchStart={() => {}}
                >
                  Ketentuan Pajak
                </Link>
                .
              </Text>
            </Checkbox>
            {/* // submit button */}
            <Button
              onPress={() => {
                // handleSubmit();
                // setFormStep(formStep + 1);
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
