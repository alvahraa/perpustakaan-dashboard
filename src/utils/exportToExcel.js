import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

/**
 * Export data to Excel (.xlsx) file
 * 
 * @param {Array} data - Array of objects to export
 * @param {string} fileName - Base name for the file (without extension)
 * @param {string} sheetName - Optional sheet name (default: 'Data')
 */
export function exportToExcel(data, fileName, sheetName = 'Data') {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Auto-size columns
  const colWidths = Object.keys(data[0]).map(key => ({
    wch: Math.max(
      key.length,
      ...data.map(row => String(row[key] || '').length)
    ) + 2
  }));
  worksheet['!cols'] = colWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Generate filename with timestamp
  const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
  const fullFileName = `${fileName}_${timestamp}.xlsx`;

  // Generate buffer and save
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  
  saveAs(blob, fullFileName);
  
  console.log(`Exported ${data.length} rows to ${fullFileName}`);
  return fullFileName;
}

/**
 * Format visitor data for export
 */
export function formatVisitorData(visitors) {
  return visitors.map(v => ({
    'NIM': v.nim,
    'Nama': v.name,
    'Fakultas': v.faculty,
    'Prodi': v.prodi,
    'Tanggal': v.date,
    'Jam Masuk': v.checkIn,
    'Jam Keluar': v.checkOut || '-',
    'Durasi (menit)': v.duration || 0,
  }));
}

/**
 * Format loan data for export
 */
export function formatLoanData(loans) {
  return loans.map(l => ({
    'ID Peminjaman': l.id,
    'ID Buku': l.bookId,
    'Judul Buku': l.bookTitle || '-',
    'ID Anggota': l.memberId,
    'Nama Peminjam': l.borrowerName || '-',
    'Tanggal Pinjam': l.loanDate,
    'Tanggal Kembali': l.returnDate || '-',
    'Status': l.returnDate ? 'Dikembalikan' : l.isLate ? 'Terlambat' : 'Aktif',
  }));
}

export default exportToExcel;
