@extends('layouts.admin')

@section('title', 'Role')

@section('content')
<div class="card">
    <div class="card-header">
        <a href="{{ url('/admin/roles/'.$role->id.'/edit') }}" class="btn btn-primary"><i class="fas fa-edit"></i> Edit role</a>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>{{ $role->id }}</td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>{{ $role->name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection