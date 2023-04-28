@extends('layouts.admin')

@section('title', 'Users')

@section('content')
<div class="card">
    <div class="card-header">
        <h6 class="m-0 font-weight-bold text-primary">
            @if(isset($user))
            Edit exist user
            @else
            Create new user
            @endif
        </h6>
    </div>
    <div class="card-body">
        @if(isset($user))
        {!! Form::model($user, ['url' => ['admin/users', $user->id], 'method' => 'patch', 'class' => 'needs-validation']) !!}
        @else
        {!! Form::open(['url' => 'admin/users', 'class' => 'needs-validation']) !!}
        @endif

        <div class="form-group">
            {!! Form::label('name', 'Name: ', ['class' => 'col-sm-3']) !!}
            <div class="col-sm-6">
                {!! Form::text('name', null, ['class' => 'form-control'.($errors->has('name') ? ' is-invalid' : ''), 'required' => 'required']) !!}
                {!! $errors->first('name', '<div class="invalid-feedback">:message</div>') !!}
            </div>
        </div>
        <div class="form-group">
            {!! Form::label('email', 'E-mail: ', ['class' => 'col-sm-3']) !!}
            <div class="col-sm-6">
                {!! Form::email('email', null, ['class' => 'form-control'.($errors->has('email') ? ' is-invalid' : ''), 'required' => 'required']) !!}
                {!! $errors->first('email', '<div class="invalid-feedback">:message</div>') !!}
            </div>
        </div>
        @if(!isset($user))
        <div class="form-group">
            {!! Form::label('password', 'Password: ', ['class' => 'col-sm-3']) !!}
            <div class="col-sm-6">
                {!! Form::password('password', ['class' => 'form-control'.($errors->has('password') ? ' is-invalid' : ''), 'required' => 'required']) !!}
                {!! $errors->first('password', '<div class="invalid-feedback">:message</div>') !!}
            </div>
        </div>
        <div class="form-group">
            {!! Form::label('password_confirmation', 'Confirm password: ', ['class' => 'col-sm-3']) !!}
            <div class="col-sm-6">
                {!! Form::password('password_confirmation', ['class' => 'form-control'.($errors->has('password_confirmation') ? ' is-invalid' : ''), 'required' => 'required']) !!}
                {!! $errors->first('password_confirmation', '<div class="invalid-feedback">:message</div>') !!}
            </div>
        </div>
        @endif
        <div class="form-group">
            {!! Form::label('role_id', 'Role: ', ['class' => 'col-sm-3']) !!}
            <div class="col-sm-6">
                {!!Form::select('role_id', $roles, isset($user) ? $selected_roles : null, ['class' => 'form-control', 'multiple' => 'multiple', 'name' => 'roles[]', 'required' => 'required'])!!}
                {!! $errors->first('role_id', '<div class="invalid-feedback">:message</div>') !!}
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-offset-3 col-sm-3">
                {!! Form::submit('Save', ['class' => 'btn btn-primary form-control']) !!}
            </div>
        </div>
        {!! Form::close() !!}
    </div>
</div>
@endsection