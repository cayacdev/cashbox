import { CashBox } from '../../model/cash-box.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CashBoxConnector {
  private readonly ENDPOINT_CASH_BOX = `${environment.backendDomain}/v1/cash-boxes`;

  constructor(private readonly http: HttpClient) {}

  fetchCashBoxes(): Observable<CashBox[]> {
    return this.http.get<CashBox[]>(this.ENDPOINT_CASH_BOX);
  }

  createCashBox(cashBox: CashBox): Observable<void> {
    return this.http.post<void>(`${this.ENDPOINT_CASH_BOX}`, cashBox);
  }

  updateCashBox(cashBox: CashBox): Observable<void> {
    return this.http.put<void>(`${this.ENDPOINT_CASH_BOX}/${cashBox.id}`, cashBox);
  }

  deleteCashBox(cashBox: CashBox): Observable<void> {
    return this.http.delete<void>(`${this.ENDPOINT_CASH_BOX}/${cashBox.id}`);
  }
}
