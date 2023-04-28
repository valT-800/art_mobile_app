@extends('layouts.admin')

@section('title', 'Users')

@section('content')
<div class="card">
    <div class="card-header">
        <a href="{{ url('/admin/users/'.$user->id.'/edit') }}" class="btn btn-primary"><i class="fas fa-edit"></i> Edit user</a>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>{{ $user->id }}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{{ $user->name }}</td>
                    </tr>
                    <tr>
                        <td>E-mail</td>
                        <td><a href="mailto:{{ $user->email }}">{{ $user->email }}</a></td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>@foreach($user->roles as $role) {{ $role->name }} @endforeach</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection