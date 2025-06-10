# Arduino Senkron Step Motor Sistemi

Bu dizinde **Arduino Uno** ile beslenen bes adet step motoru, iki adet analog sensörü ve limit switch’leri kullanarak senkron çalışan örnek bir sistem için kodlar yer alır. 
Ayrıca seri haberleşme ile **Processing** tarafından kontrol edilen görsel bir arayüz de sağlanmıştır.

## Dosyalar

- `stepper_system.ino` : Arduino tarafındaki ana kontrol yazılımı.
- `processing_control.pde` : Bilgisayarda çalışan ve Arduino’yu seri porttan yöneten Processing arayüzü.

## Sistem Detayları

1. **Bes adet step motor** A4988 sürücüler ile kontrol edilir. Her motor için ayrı limit sensör bağlıdır.
2. **Sensor Shield** kullanılarak hem step motor sürücülerine hem de diğer sensörlere kolay bağlantı sağlanır.
3. Üzerindeki **16x2 LCD ekran** sistemi başlatıldığında "Stepper Ready" mesajı verir ve sensör değerlerini gösterir.
4. Seri haberleşme protokolü basit tutularak her komutta motor numarası, yön (0/1) ve adım sayısı gönderilir.
5. **Processing** arayüzü klavye kısayolları ile motor hareketlerini başlatabilir ve `r` tuşu ile bütün motorlar durdurulabilir.

Kurulum için Arduino IDE'de `AccelStepper` kütüphanesinin yüklü oldugundan emin olunuz. Processing tarafında da `Serial` kütüphanesi yüklenmiş olmalıdır.
