
function domID(id){
    return document.getElementById(id);
}
/*************BT: QUẢN LÝ TUYỂN SINH***********/
function tinhDiemKhuVuc(khuVuc){
    
    if(khuVuc == 'khuVucA'){
        return 2;
    } else if(khuVuc == 'khuVucB'){
        return 1;
    } else if(khuVuc == 'khuVucC'){
        return 0.5;
    } else{
        return 0;
    }
}

function tinhDiemDoiTuong(doiTuong){
    switch(doiTuong){
        case 'doiTuong1': {
            return 2.5;
        }
        case 'doiTuong2': {
            return 1.5;
        }
        case 'doiTuong3': {
            return 1;
        }
        default: {
            return 0;
        }
    }
}

function kiemTraKetQua(diemMon1, diemMon2, diemMon3, tongDiem, diemChuan){
    if(diemMon1 == 0 || diemMon2 == 0 || diemMon3 == 0){
        return 'Rớt';
    } else if(tongDiem >= diemChuan){
        return 'Đậu';
    } else {
        return 'Rớt';
    }
}

domID('btnKetQua').onclick = function(){
    var diemChuan = Number(domID('diemChuan').value);
    var diemMon1 = Number(domID('diemMon1').value);
    console.log(diemMon1)
    var diemMon2 = Number(domID('diemMon2').value);
    var diemMon3 = Number(domID('diemMon3').value);

    var khuVuc = document.querySelector('input[name="selector"]:checked').value;
    var doiTuong = document.querySelector('input[name="selector1"]:checked').value;



    if(diemChuan <= 0 || diemMon1 < 0 || diemMon2 < 0 || diemMon3 < 0){
        return domID('ketQua1').innerHTML = 'Dữ liệu không hợp lệ'
    }

    var diemKhuVuc = tinhDiemKhuVuc(khuVuc);
    var diemDoiTuong = tinhDiemDoiTuong(doiTuong);
    
    var tongDiem = diemMon1 + diemMon2 + diemMon3 + diemDoiTuong + diemKhuVuc;
    
    var ketQua = kiemTraKetQua(diemMon1, diemMon2, diemMon3, tongDiem, diemChuan);

    domID('ketQua1').innerHTML = `Tổng điểm: ${tongDiem} - Kết quả: ${ketQua}`;
}

/************BT TÍNH TIỀN ĐIỆN************/
domID('btnTinhTienDien').onclick = function(){
    
    var nameUser = domID('nameUser').value;
    var soKw = Number(domID('soKw').value);
    var giaKw1den50 = 500;
    var giaKw50den100 = 650;
    var giaKw100den200 = 850;
    var giaKw200den350 = 1100;
    var giaKw350trodi = 1300;
    var ketQua = 0;

    if(soKw < 0){
        return domID('ketQua2').innerHTML = 'Dữ liệu không hợp lệ';
    }
    if(soKw <= 50){
         ketQua = giaKw1den50 * soKw;
     } else if(soKw > 50 && soKw <= 100){
         ketQua = giaKw1den50 * 50 + (soKw - 100) * giaKw50den100;
     } else if(soKw > 100 && soKw <= 200){
         ketQua = giaKw1den50 * 50 + giaKw50den100 * 50 + (soKw - 100) * giaKw100den200;
     } else if(soKw > 200 && soKw <= 350){
         ketQua = giaKw1den50 * 50 + giaKw50den100 * 50 + giaKw100den200 * 100 + (soKw - 200) * giaKw200den350;
     } else{
         ketQua = giaKw1den50 * 50 + giaKw50den100 * 50 + giaKw100den200 * 100 + giaKw200den350 * 150 + (soKw - 350) * giaKw350trodi
     }
 
   domID('ketQua2').innerHTML =  'Tên: ' + nameUser + ' - Tiền điện: ' + ketQua.toLocaleString() + ' VND'; 
    
}

/*********BT TÍNH THUẾ THU NHẬP CÁ NHÂN**********/
function tinhThueSuat(thuNhap){
    if(thuNhap <= 60000000){
        return 0.05;
    } else if(thuNhap>60000000 && thuNhap <= 120000000){
        return 0.1;
    } else if(thuNhap > 120000000 && thuNhap <= 210000000){
        return 0.15;
    } else if(thuNhap > 210000000 && thuNhap <= 384000000){
        return 0.2;
    } else if(thuNhap > 3840000000 && thuNhap <= 624000000){
        return 0.25;
    } else if(thuNhap > 624000000 && thuNhap <= 960000000){
        return 0.3;
    } else{
        return 0.35;
    }
}

domID('btnTinhThueTNCN').onclick = function(){
    var hoTen = domID('hoTen').value;
    var tongThuNhapNam = domID('tongThuNhapNam').value*1;
    var soNguoiPhuThuoc = domID('soNguoiPhuThuoc').value*1;

    if(tongThuNhapNam == 0 || soNguoiPhuThuoc < 0){
        return domID('ketQua3').innerHTML = 'Dữ liệu không hợp lệ';
    }

    var thuNhapChiuThue = tongThuNhapNam - 4000000 - (soNguoiPhuThuoc * 1600000);

    var thueSuat = tinhThueSuat(thuNhapChiuThue);

   

    var thueTNCN = thuNhapChiuThue * thueSuat;

     if(thueTNCN <= 0){
        return  domID('ketQua3').innerHTML = 'Họ và tên: ' + hoTen + ' - Thu nhập không hợp lệ. '
    }

    domID('ketQua3').innerHTML = 'Họ và tên: ' + hoTen + ' - Tiền thuế TNCN: ' + thueTNCN.toLocaleString() + ' VND';

}

/**************BT TÍNH TIỀN CÁP***********/

function tinhPhiXuLyHoaDon(loaiKhachHang){
     if(loaiKhachHang == 0){
        return alert('Vui lòng chọn loại khách hàng');
     }
    if(loaiKhachHang == 'doanhNghiep'){
        return 15;
    } else{
        return 4.5
    }
}
function tinhPhiDichVu(loaiKhachHang, soKetNoi){
     if(loaiKhachHang == 0){
        return alert('Vui lòng chọn loại khách hàng');
     }
    if(loaiKhachHang == 'doanhNghiep'){
        if(soKetNoi <= 10){
            return 75;
        } else{
            return (75 + 5*(soKetNoi - 10));
        }
    } else{
        return 20.5;
    }
}

function tinhPhiThueKenhCaoCap(loaiKhachHang, soKenhCaoCap){
     if(loaiKhachHang == 0){
        return alert('Vui lòng chọn loại khách hàng');
     }
    if(loaiKhachHang == 'doanhNghiep'){
        return soKenhCaoCap*50;
    } else{
        return soKenhCaoCap*7.5
    }
}

function getCustom(loaiKhachHang) {   
    var loaiKhachHang = document.querySelector(
      'option[name="selector"]:checked'
    ).value;

    if(loaiKhachHang == 0){
        return alert('Vui lòng chọn loại khách hàng');
    } else if (loaiKhachHang == "nhaDan") {
      domID("delete").style.opacity = "0";
    } else if (loaiKhachHang == "doanhNghiep") {
      domID("delete").style.opacity = "1";
    } else {
      domID("delete").style.opacity = "0";
    }
  }

domID('btnTinhTienCap').onclick = function(){
    
    var maKhachHang = domID('maKhachHang').value;
    var soKenhCaoCap = Number(domID('soKenhCaoCap').value);
    var soKetNoi = Number(domID('soKetNoi').value);
    var loaiKhachHang = document.querySelector('option[name="selector"]:checked').value;
    
    if(maKhachHang == 0 || soKenhCaoCap == null || soKetNoi == null || loaiKhachHang == false ){
         alert('Vui lòng nhập đầy đủ dữ liệu')
        return   domID('ketQua4').innerHTML = 'Dữ liệu không hợp lệ'
    }

    var phiXuLyHoaDon = tinhPhiXuLyHoaDon(loaiKhachHang);
    var phiDichVu = tinhPhiDichVu(loaiKhachHang,soKetNoi);
    var phiThueKenhCaoCap = tinhPhiThueKenhCaoCap(loaiKhachHang, soKenhCaoCap);

    var tienCap = phiXuLyHoaDon + phiDichVu + phiThueKenhCaoCap;
   

    domID('ketQua4').innerHTML = 'Mã khách hàng: ' + maKhachHang + ' - Tiền cáp: $' + tienCap.toLocaleString();
}