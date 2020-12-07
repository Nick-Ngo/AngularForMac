import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "oidc-client";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";
import { UtilityService } from "./utilitiy.service";
import { catchError, map } from 'rxjs/operators';
import { Pagination } from "../models/pagination.model";


@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {

    private httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    constructor(private http: HttpClient, private utilityService: UtilityService) {
        super();
    }

    // add user
    add(entity: User) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(`${environment.apiUrl}/api/User`, JSON.stringify(entity), this.httpOptions).pipe(catchError(this.handleError));
    }

    // update user
    update(id: string, entity: User) {
        // tslint:disable-next-line:max-line-length
        return this.http.put(`${environment.apiUrl}/api/User/` + id, JSON.stringify(entity), this.httpOptions).pipe(catchError(this.handleError));
    }

    // delete user
    delete(id: string) {
        return this.http.delete(environment.apiUrl + '/api/User/' + id, this.httpOptions).pipe(catchError(this.handleError));
    }

    // get detail user
    getDetail(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/api/User/get-user-id/${id}`, this.httpOptions).pipe(catchError(this.handleError));
    }

    // get all user
    getAll(keyword?: any) {
        return this.http.get<User[]>(`${environment.apiUrl}/api/User/get-user?keyword=${keyword}`, this.httpOptions).pipe(catchError(this.handleError));
    }

    // get user paging
    getAllPaging(filter: any, pageIndex: any, pageSize: any) {
        // tslint:disable-next-line:max-line-length
        return this.http.get<Pagination<User>>(`${environment.apiUrl}/api/User/get-user-paging?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`, this.httpOptions)
            .pipe(map((response: Pagination<User>) => {
                return response;
            }), catchError(this.handleError));
    }

    // get menu for user role
    getMenuByUser(userId: string) {
        return this.http.get<Function[]>(`${environment.apiUrl}/api/User/${userId}/menu`, this.httpOptions).pipe(map(response => {
            const functions = this.utilityService.UnflatteringForLeftMenu(response);
            return functions;
        }), catchError(this.handleError));
    }

    // User Role
    getUserRoles(userId: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.get<string[]>(`${environment.apiUrl}/api/User/${userId}/role`, this.httpOptions).pipe(catchError(this.handleError));
    }

    removeRolesFromUser(id: string, roleNames: string[]) {
        let rolesQuery = '';
        for (const roleName of roleNames) {
            rolesQuery += 'roleNames' + '=' + roleName + '&';
        }
        // tslint:disable-next-line:max-line-length
        return this.http.delete(environment.apiUrl + '/api/User/' + id + '/role?' + rolesQuery, this.httpOptions).pipe(catchError(this.handleError));
    }

    assignRolesToUser(userId: string, assignRolesToUser: any) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(`${environment.apiUrl}/api/User/${userId}/role`, JSON.stringify(assignRolesToUser), this.httpOptions).pipe(catchError(this.handleError));
    }
}
