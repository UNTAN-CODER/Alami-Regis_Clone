import React, { useState, useEffect } from "react";
import {
  Text,
  VStack,
  Button,
  Link,
} from "native-base";

export default function Step3() {

  return (
    <VStack fontFamily="WorkSans_400Regular">
      <Text>Terima Kasih!</Text>
      <Text>Kamu sudah berhasil mendaftar sebagai Penerima Dana. Silahkan klik link aktivasi yang dikirimkan ke email Kamu.</Text>
      <Text>Belum menerima emailnya?</Text>
      <Button onPress={()=>{
        //
        console.log("Kirim Ulang Aktivasi Email")
      }} >Kirim Ulang Aktivasi Email</Button>
      <Text>Setelah klik link aktivasi di email, Kamu bisa langsung login dan lengkapi profile akun-mu. Setelahnya tim Mina akan cek verifikasi tersebut, tenang aja tim Mina akan informasikan kalau ada data yang kurang, dan jika sudah lengkap maka Kamu sudah bisa mulai mendanai pada objek pembiayaan yang tersedia ya.</Text>
      <Text>Sudah memiliki akun? <Link href="https://p2p.alamisharia.co.id/login" >masuk</Link></Text>

   
   
    </VStack>
  );
}
